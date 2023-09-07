import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

import { Course } from "./course";

@Component({
    selector: "app-course",
    templateUrl: "./course.component.html",
    styleUrls: ["./course.component.less"],
    changeDetection: ChangeDetectionStrategy.OnPush,
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

    private setBackgroundColor(): void {
        if (this.course.topRated) {
            this.backgroundColorClass = "background-rated";
        }
    }
}
