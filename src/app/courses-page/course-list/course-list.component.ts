import { ChangeDetectionStrategy, Component, Inject, OnInit, TemplateRef } from "@angular/core";
import { TuiDialogService } from "@taiga-ui/core";
import { finalize, map, Observable } from "rxjs";

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
    courses$?: Observable<Course[]>;

    constructor(
        private readonly coursesService: CoursesService,
        @Inject(TuiDialogService) private readonly dialogs: TuiDialogService,
        private readonly loadingService: LoadingService
    ) {}

    ngOnInit(): void {
        this.loadingService.show();
        this.coursesService
            .loadAllCourses$()
            .pipe(
                map((courses) => courses.slice().sort((a, b) => new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime())),
                finalize(() => {
                    this.loadingService.hide();
                })
            )
            .subscribe();
        this.courses$ = this.coursesService.getCourses$();
    }

    onCourseDeleted(courseId: string, deleteDialog: TemplateRef<any>): void {
        this.dialogs.open(deleteDialog, { label: "Be careful", size: "m" }).subscribe((result: boolean | void) => {
            if (result === true) {
                this.coursesService.deleteCourse(courseId);
            }
        });
    }

    protected trackByCourseId(_: number, course: Course): string {
        return course.id;
    }
}
