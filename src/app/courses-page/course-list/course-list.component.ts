import {ChangeDetectionStrategy, Component, Inject, Input, TemplateRef} from "@angular/core";
import {TuiDialogService} from "@taiga-ui/core";
import {takeUntil} from "rxjs";

import {CoursesService} from "../../service/courses.service";
import {FilterPipe} from "../search/filter.pipe";
import {Course} from "./course/course";

@Component({
    selector: "app-course-list",
    templateUrl: "./course-list.component.html",
    styleUrls: ["./course-list.component.less"],
    providers: [FilterPipe],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseListComponent {
    @Input()
    searchText!: string;

    courses: Course[] | undefined;

    constructor(
        private readonly filterPipe: FilterPipe,
        private readonly coursesService: CoursesService,
        @Inject(TuiDialogService) private readonly dialogs: TuiDialogService
    ) {
    }

    get filteredCourses(): Course[] | [] {
        if (this.courses) {
            return this.filterPipe.transform(this.courses, this.searchText);
        }

        return [];
    }

    ngOnInit(): void {
        this.coursesService.getCourses$().pipe(
            takeUntil(this.coursesService.loadCourses$()),
        ).subscribe(coursesArray => {
            this.courses = this.sortCoursesByDate(coursesArray);
        });
    }

    onCourseDeleted(courseId: string, deleteDialog: TemplateRef<any>): void {
        this.dialogs.open(deleteDialog, {label: "Be careful", size: "m"}).subscribe((result: boolean | void) => {
            if (result === true && this.courses) {
                this.coursesService.deleteCourse(courseId);
                this.courses = this.courses.filter((course) => course.id !== courseId);
            }
        });
    }

    private sortCoursesByDate(courses: Course[]): Course[] {
        return courses.sort((a, b) => {
            const dateA = a.creationDate;
            const dateB = b.creationDate;

            return dateB.getTime() - dateA.getTime();
        });
    }
}
