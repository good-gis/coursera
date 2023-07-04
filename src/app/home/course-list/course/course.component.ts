import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

import { Course } from "./course";

@Component({
    selector: "app-course",
    templateUrl: "./course.component.html",
    styleUrls: ["./course.component.less"],
})
export class CourseComponent implements OnInit {
    @Input()
    course!: Course;

    @Output()
    courseDeleted: EventEmitter<string> = new EventEmitter<string>();

    backgroundColorClass!: string;

    ngOnInit(): void {
        this.setBackgroundColor();
    }

    onDeleteClick(): void {
        this.courseDeleted.emit(this.course.id);
    }

    private setBackgroundColor(): void {
        if (this.course.topRated) {
            this.backgroundColorClass = "background-rated";
        }
    }
}
