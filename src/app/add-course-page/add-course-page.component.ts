import { Component } from "@angular/core";
import { TUI_DEFAULT_MATCHER, TuiDay, tuiPure } from "@taiga-ui/cdk";

import { Course } from "../courses-page/course-list/course/course";
import {Location} from "@angular/common";
import {authors} from "../courses-page/course-list/authors-mock";

@Component({
    selector: "app-add-course-page",
    templateUrl: "./add-course-page.component.html",
    styleUrls: ["./add-course-page.component.less", "../app.component.less"],
})
export class AddCoursePageComponent {
    course: Course = {
        id: "",
        title: "",
        creationDate: new Date(),
        duration: 0,
        description: "",
        topRated: false,
        authors: ["Luke Skywalker"],
        publicationDate: new TuiDay(2022, 8, 20),
    };

    search: string | null = "";

    constructor(private readonly location: Location) {
    }

    @tuiPure
    filter(search: string | null): readonly string[] {
        return authors.filter((item) => TUI_DEFAULT_MATCHER(item, search ?? ""));
    }

    onSubmitClicked(): void {
        // eslint-disable-next-line no-console
        console.log("Submitted:", this.course);
    }

    onCancelClicked(): void {
       this.location.back();
    }
}
