import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";

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

    constructor(private readonly router: Router) {}

    ngOnInit(): void {
        this.setBackgroundColor();
    }

    protected onEditCourse(id: string): void {
        void this.router.navigate(["/courses", id]);
    }

    private setBackgroundColor(): void {
        if (this.course.topRated) {
            this.backgroundColorClass = "background-rated";
        }
    }
}
