import {Component, Input} from "@angular/core";

import {FilterPipe} from "../search/filter.pipe";
import {Course} from "./course/course";
import {CoursesService} from "../../../service/courses.service";

@Component({
    selector: "app-course-list",
    templateUrl: "./course-list.component.html",
    styleUrls: ["./course-list.component.less"],
    providers: [FilterPipe],
})
export class CourseListComponent {
    @Input()
    searchText!: string;
    courses: Course[] | undefined;

    constructor(private readonly filterPipe: FilterPipe, private coursesService: CoursesService) {
    }

    get filteredCourses(): Course[] | void {
        if (this.courses) {
            return this.filterPipe.transform(this.courses, this.searchText);
        }
    }

    ngOnInit(): void {
        this.courses = this.sortCoursesByDate(this.coursesService.getCourses());
    }

    onCourseDeleted(courseId: string): void {
        const confirmation = confirm('Do you really want to delete this course?');
        if (confirmation && this.courses) {
            this.coursesService.deleteCourse(courseId);
            this.courses = this.courses.filter(course => course.id !== courseId);
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
