import { ChangeDetectionStrategy, Component, Inject, Input, OnInit, TemplateRef } from "@angular/core";
import { TuiDialogContext, TuiDialogService } from "@taiga-ui/core";
import { PolymorpheusContent } from "@tinkoff/ng-polymorpheus";

import { CoursesService } from "../../../service/courses.service";
import { FilterPipe } from "../search/filter.pipe";
import { Course } from "./course/course";

@Component({
    selector: "app-course-list",
    templateUrl: "./course-list.component.html",
    styleUrls: ["./course-list.component.less"],
    providers: [FilterPipe],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseListComponent implements OnInit {
    private courseId: string | undefined;

    @Input()
    searchText!: string;

    courses: Course[] | undefined;

    constructor(
        private readonly filterPipe: FilterPipe,
        private readonly coursesService: CoursesService,
        @Inject(TuiDialogService) private readonly dialogs: TuiDialogService
    ) {}

    ngOnInit(): void {
        this.courses = this.sortCoursesByDate(this.coursesService.getCourses());
    }

    get filteredCourses(): Course[] | [] {
        if (this.courses) {
            return this.filterPipe.transform(this.courses, this.searchText);
        }

        return [];
    }

    onCourseDeleted(courseId: string, deleteDialog: TemplateRef<any>): void {
        this.courseId = courseId;
        this.showDialogWithYesNoButtons(deleteDialog);
    }

    showDialogWithYesNoButtons(content: PolymorpheusContent<TuiDialogContext>): void {
        this.dialogs.open(content, { label: "Be careful", size: "m" }).subscribe();
    }

    deleteCourse(): void {
        if (this.courses && this.courseId) {
            this.coursesService.deleteCourse(this.courseId);
            this.courses = this.courses.filter((course) => course.id !== this.courseId);
        }
    }

    private sortCoursesByDate(courses: Course[]): Course[] {
        return courses.sort((a, b) => {
            const dateA = a.creationDate;
            const dateB = b.creationDate;

            return dateB.getTime() - dateA.getTime();
        });
    }
}
