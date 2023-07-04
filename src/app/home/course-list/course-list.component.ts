import { Component, Input } from "@angular/core";

import { FilterPipe } from "../search/filter.pipe";
import { Course } from "./course/course";
import { courses } from "./courses-mock";

@Component({
    selector: "app-course-list",
    templateUrl: "./course-list.component.html",
    styleUrls: ["./course-list.component.less"],
    providers: [FilterPipe],
})
export class CourseListComponent {
    @Input()
    searchText!: string;

    courses: Course[] = courses.sort((a, b) => {
        const dateA = a.creationDate;
        const dateB = b.creationDate;

        return dateB.getTime() - dateA.getTime();
    });

    constructor(private readonly filterPipe: FilterPipe) {}

    get filteredCourses(): Course[] {
        return this.filterPipe.transform(this.courses, this.searchText);
    }

    onCourseDeleted(courseId: string): void {
        // eslint-disable-next-line no-console
        console.log("Удален курс с id:", courseId);
    }
}
