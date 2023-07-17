import { Component, Input, OnInit } from "@angular/core";

import { CoursesService } from "../../../service/courses.service";
import { FilterPipe } from "../search/filter.pipe";
import { Course } from "./course/course";

@Component({
    selector: "app-course-list",
    templateUrl: "./course-list.component.html",
    styleUrls: ["./course-list.component.less"],
    providers: [FilterPipe],
})
export class CourseListComponent implements OnInit {
    @Input()
    searchText!: string;

    courses: Course[] | undefined;

    constructor(private readonly filterPipe: FilterPipe, private readonly coursesService: CoursesService) {}

    ngOnInit(): void {
        this.courses = this.sortCoursesByDate(this.coursesService.getCourses());
    }

    get filteredCourses(): Course[] | [] {
        if (this.courses) {
            return this.filterPipe.transform(this.courses, this.searchText);
        }

        return [];
    }

    onCourseDeleted(courseId: string): void {
        // eslint-disable-next-line no-restricted-globals, no-alert
        const confirmation = confirm("Do you really want to delete this course?");

        if (confirmation && this.courses) {
            this.coursesService.deleteCourse(courseId);
            this.courses = this.courses.filter((course) => course.id !== courseId);
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
