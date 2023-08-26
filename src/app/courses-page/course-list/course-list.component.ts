import { ChangeDetectionStrategy, Component, Inject, TemplateRef } from "@angular/core";
import { TuiDialogService } from "@taiga-ui/core";
import { map, Observable, of } from "rxjs";

import { LoadingService } from "../../loading-overlay/loading.service";
import { CoursesService } from "../../service/courses.service";
import { FilterPipe } from "../search/filter.pipe";
import { Course } from "./course/course";

@Component({
    selector: "app-course-list",
    templateUrl: "./course-list.component.html",
    styleUrls: ["./course-list.component.less"],
    providers: [FilterPipe],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseListComponent {
    courses$: Observable<Course[]> = of([]);

    constructor(
        private readonly filterPipe: FilterPipe,
        private readonly coursesService: CoursesService,
        private readonly loadingService: LoadingService,
        @Inject(TuiDialogService) private readonly dialogs: TuiDialogService
    ) {
        this.loadingService.show();
        this.courses$ = this.coursesService
            .getCourses$()
            .pipe(map((courses) => courses.slice().sort((a, b) => b.creationDate.getTime() - a.creationDate.getTime())));
        setInterval(() => {
            this.loadingService.hide();
        }, 1000);
    }

    onCourseDeleted(courseId: string, deleteDialog: TemplateRef<any>): void {
        this.dialogs.open(deleteDialog, { label: "Be careful", size: "m" }).subscribe((result: boolean | void) => {
            if (result === true) {
                this.loadingService.show();
                this.coursesService.deleteCourse(courseId);
                this.loadingService.hide();
            }
        });
    }
}
