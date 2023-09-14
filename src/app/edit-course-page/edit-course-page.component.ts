import { Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { TUI_DEFAULT_MATCHER } from "@taiga-ui/cdk";
import { delay, filter, Observable, of, startWith, Subject, switchMap } from "rxjs";

import { authors } from "../courses-page/course-list/authors-mock";
import { Course } from "../courses-page/course-list/course/course";
import { emptyCourse } from "../courses-page/course-list/courses-mock";
import { CoursesService } from "../service/courses.service";

@Component({
    selector: "app-edit-course-page",
    templateUrl: "./edit-course-page.component.html",
    styleUrls: ["./edit-course-page.component.less", "../app.component.less"],
})
export class EditCoursePageComponent implements OnInit {
    course: Course = emptyCourse;
    searchValue: string | null = "";
    readonly search$ = new Subject<string | null>();
    readonly items$: Observable<readonly string[] | null> = this.search$.pipe(
        filter((value) => value !== null),
        switchMap((search) => this.serverRequest(search).pipe(startWith<readonly string[] | null>(null))),
        startWith(authors)
    );

    authorsValue = new FormControl(this.course.authors);

    constructor(
        private readonly activatedRoute: ActivatedRoute,
        private readonly location: Location,
        private readonly router: Router,
        private readonly courseService: CoursesService
    ) {}

    ngOnInit(): void {
        this.activatedRoute.paramMap.subscribe((params) => {
            const id = params.get("id");

            if (id) {
                const course = this.courseService.getCourse(id).shift();

                if (course) {
                    this.course = course;
                    this.authorsValue = new FormControl(this.course.authors);
                } else {
                    void this.router.navigate(["/404"]);
                }
            }
        });
    }

    onSearchChange(searchQuery: string | null): void {
        this.searchValue = searchQuery;
        this.search$.next(searchQuery);
    }

    onClickSave(updatedCourse: Course): void {
        updatedCourse.authors = this.authorsValue.value;
        this.courseService.updateCourse(updatedCourse);
        void this.router.navigate(["/courses"]);
    }

    onClickCancel(): void {
        this.location.back();
    }

    onEnterCreateAuthor(event: any): void {
        if (event.key === "Enter" && this.searchValue) {
            authors.push(this.searchValue);

            const currentAuthors = this.authorsValue.value ?? [];

            this.authorsValue.setValue([...currentAuthors, this.searchValue]);

            this.searchValue = "";
        }
    }

    /**
     * Server request emulation
     */
    private serverRequest(searchQuery: string | null): Observable<readonly string[]> {
        const result = authors.filter((user) => TUI_DEFAULT_MATCHER(user, searchQuery ?? ""));

        return of(result).pipe(delay(1000));
    }
}
