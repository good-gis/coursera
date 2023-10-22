import { Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { TUI_DEFAULT_MATCHER } from "@taiga-ui/cdk";
import _ from "lodash";
import { BehaviorSubject, debounceTime, delay, filter, finalize, Observable, of, startWith, switchMap, tap } from "rxjs";

import { authors } from "../courses-page/course-list/authors-mock";
import { Course } from "../courses-page/course-list/course/course";
import { emptyCourse } from "../courses-page/course-list/courses-mock";
import { LoadingService } from "../loading-overlay/loading.service";
import { CoursesService } from "../service/courses.service";

@Component({
    selector: "app-edit-course-page",
    templateUrl: "./edit-course-page.component.html",
    styleUrls: ["./edit-course-page.component.less", "../app.component.less"],
})
export class EditCoursePageComponent implements OnInit {
    course: Course = _.cloneDeep(emptyCourse);
    readonly search$ = new BehaviorSubject<string | null>(null);
    readonly items$: Observable<readonly string[] | null> = this.search$.pipe(
        filter((value) => value !== null),
        switchMap((search) => this.serverRequest(search).pipe(startWith<readonly string[] | null>(null))),
        startWith(authors)
    );

    authorsFormControl = new FormControl(this.course.authors);

    constructor(
        private readonly activatedRoute: ActivatedRoute,
        private readonly location: Location,
        private readonly router: Router,
        private readonly courseService: CoursesService,
        private readonly loadingService: LoadingService
    ) {}

    ngOnInit(): void {
        this.activatedRoute.paramMap
            .pipe(
                filter((params) => params.has("id")),
                switchMap((params) => {
                    const id = params.get("id");

                    if (id === null) {
                        return of(undefined);
                    }

                    return this.courseService.getCourse$(id);
                }),
                debounceTime(500),
                tap((course) => {
                    if (course) {
                        this.course = course;
                        this.authorsFormControl = new FormControl(this.course.authors);
                    } else {
                        void this.router.navigate(["/404"]);
                    }
                })
            )
            .subscribe();
    }

    onSearchChange(searchQuery: string | null): void {
        this.search$.next(searchQuery);
    }

    onClickSave(updatedCourse: Course): void {
        if (this.authorsFormControl.value) {
            updatedCourse.authors = this.authorsFormControl.value;
        }

        this.loadingService.show();
        this.courseService
            .updateCourse$(updatedCourse)
            .pipe(
                finalize(() => {
                    this.loadingService.hide();
                })
            )
            .subscribe();
        void this.router.navigate(["/courses"]);
    }

    onClickCancel(): void {
        this.location.back();
    }

    onEnterCreateAuthor(event: any): void {
        if (event.key === "Enter" && this.search$.value) {
            authors.push(this.search$.value);
            const currentAuthors = this.authorsFormControl.value ?? [];

            this.authorsFormControl.setValue([...currentAuthors, this.search$.value]);
        }
    }

    private serverRequest(searchQuery: string | null): Observable<readonly string[]> {
        const result = authors.filter((user) => TUI_DEFAULT_MATCHER(user, searchQuery ?? ""));

        return of(result).pipe(delay(1000));
    }
}
