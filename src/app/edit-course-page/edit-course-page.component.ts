import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Course} from "../courses-page/course-list/course/course";
import {TUI_DEFAULT_MATCHER, TuiDay, tuiPure} from "@taiga-ui/cdk";
import { Location } from '@angular/common';
import {CoursesService} from "../service/courses.service";

@Component({
    selector: 'app-edit-course-page',
    templateUrl: './edit-course-page.component.html',
    styleUrls: ['./edit-course-page.component.less', "../app.component.less"]
})
export class EditCoursePageComponent implements OnInit {

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
    readonly authors: string[] = ["Luke Skywalker", "Leia Organa Solo", "Darth Vader", "Han Solo", "Obi-Wan Kenobi", "Yoda"];
    search: string | null = "";

    constructor(private readonly activatedRoute: ActivatedRoute, private readonly location: Location, private readonly router: Router, private readonly courseService: CoursesService) {
    }

    @tuiPure
    filter(search: string | null): readonly string[] {
        return this.authors.filter((item) => TUI_DEFAULT_MATCHER(item, search ?? ""));
    }

    ngOnInit(): void {
        this.activatedRoute.paramMap.subscribe((params) => {
            const id = params.get('id');
            this.courseService.getCourses$()
            console.log(id);
        });
    }

    onClickSave(): void {
        this.location.back();
    }

    onClickCancel(): void {
        this.location.back();
    }
}
