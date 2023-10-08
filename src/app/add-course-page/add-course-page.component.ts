import { Location } from "@angular/common";
import { Component } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { TUI_DEFAULT_MATCHER, tuiPure } from "@taiga-ui/cdk";
import { BehaviorSubject, delay, filter, finalize, Observable, of, startWith, switchMap } from "rxjs";

import { authors } from "../courses-page/course-list/authors-mock";
import { Course } from "../courses-page/course-list/course/course";
import { emptyCourse } from "../courses-page/course-list/courses-mock";
import { LoadingService } from "../loading-overlay/loading.service";
import { CoursesService } from "../service/courses.service";

@Component({
    selector: "app-add-course-page",
    templateUrl: "./add-course-page.component.html",
    styleUrls: ["./add-course-page.component.less", "../app.component.less"],
})
export class AddCoursePageComponent {
    course: Course = { ...emptyCourse };
    authorsFormControl = new FormControl(this.course.authors);
    search: string | null = "";
    readonly search$ = new BehaviorSubject<string | null>(null);
    readonly items$: Observable<readonly string[] | null> = this.search$.pipe(
        filter((value) => value !== null),
        switchMap((search) => this.serverRequest(search).pipe(startWith<readonly string[] | null>(null))),
        startWith(authors)
    );

    constructor(
        private readonly location: Location,
        private readonly courseService: CoursesService,
        private readonly loadingService: LoadingService,
        private readonly router: Router
    ) {}

    @tuiPure
    filter(search: string | null): readonly string[] {
        return authors.filter((item) => TUI_DEFAULT_MATCHER(item, search ?? ""));
    }

    onSubmitClicked(): void {
        this.loadingService.show();
        this.course.id = new Date().getTime().toString();
        this.courseService
            .createCourse$(this.course)
            .pipe(
                finalize(() => {
                    this.loadingService.hide();
                    void this.router.navigate(["/courses"]);
                })
            )
            .subscribe();
        this.course = { ...emptyCourse };
    }

    onSearchChange(searchQuery: string | null): void {
        this.search$.next(searchQuery);
    }

    onCancelClicked(): void {
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
