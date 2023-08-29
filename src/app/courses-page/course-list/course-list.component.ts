import { ChangeDetectionStrategy, Component, Inject, TemplateRef } from "@angular/core";
import { TuiDialogService } from "@taiga-ui/core";
import {map, Observable} from "rxjs";

import { CoursesService } from "../../service/courses.service";
import { Course } from "./course/course";

@Component({
    selector: "app-course-list",
    templateUrl: "./course-list.component.html",
    styleUrls: ["./course-list.component.less"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseListComponent {
    courses$: Observable<Course[]>;
    hasCourses$: Observable<boolean>;

    constructor(
        private readonly coursesService: CoursesService,
        @Inject(TuiDialogService) private readonly dialogs: TuiDialogService
    ) {
        this.courses$ = this.coursesService
            .getCourses$()
            .pipe(map((courses) => courses.slice().sort((a, b) => b.creationDate.getTime() - a.creationDate.getTime())));

        this.hasCourses$ = this.courses$.pipe(map(courses => courses?.length > 0 ?? false));
    }

    onCourseDeleted(courseId: string, deleteDialog: TemplateRef<any>): void {
        this.dialogs.open(deleteDialog, { label: "Be careful", size: "m" }).subscribe((result: boolean | void) => {
            if (result === true) {
                this.coursesService.deleteCourse(courseId);
            }
        });
    }

    protected trackByCourseId(index: number, course: Course): string {
        return course.id;
    }
}
