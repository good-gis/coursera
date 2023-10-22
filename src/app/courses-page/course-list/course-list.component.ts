import { ChangeDetectionStrategy, Component, Inject, OnInit, TemplateRef } from "@angular/core";
import { TuiDialogService } from "@taiga-ui/core";
import { finalize, Observable, of, switchMap } from "rxjs";

import { LoadingService } from "../../loading-overlay/loading.service";
import { CoursesService } from "../../service/courses.service";
import { Course } from "./course/course";

@Component({
    selector: "app-course-list",
    templateUrl: "./course-list.component.html",
    styleUrls: ["./course-list.component.less"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseListComponent implements OnInit {
    courses$: Observable<Course[]> = this.coursesService.getCourses$();

    constructor(
        private readonly coursesService: CoursesService,
        @Inject(TuiDialogService) private readonly dialogs: TuiDialogService,
        private readonly loadingService: LoadingService
    ) {}

    ngOnInit(): void {
        this.loadingService.show();
        this.coursesService.clearCourses();
        this.coursesService
            .loadCourses$()
            .pipe(
                finalize(() => {
                    this.loadingService.hide();
                })
            )
            .subscribe();
        // this.courses$ = this.coursesService.getCourses$();
    }

    onCourseDeleted(courseId: string, deleteDialog: TemplateRef<any>): void {
        this.dialogs
            .open(deleteDialog, { label: "Be careful", size: "m" })
            .pipe(
                switchMap((result: boolean | void) => {
                    if (result === true) {
                        this.loadingService.show();

                        return this.coursesService.deleteCourse$(courseId).pipe(
                            switchMap(() => {
                                this.coursesService.clearCourses();

                                return this.coursesService.loadCourses$();
                            }),
                            finalize(() => {
                                this.loadingService.hide();
                            })
                        );
                    }

                    return of(undefined);
                })
            )
            .subscribe();
    }

    protected trackByCourseId(_: number, course: Course): string {
        return course.id;
    }
}
