import { Location } from "@angular/common";
import { Component, OnDestroy } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { TUI_DEFAULT_MATCHER, tuiPure } from "@taiga-ui/cdk";
import _ from "lodash";
import { BehaviorSubject, catchError, delay, filter, finalize, Observable, of, startWith, switchMap } from "rxjs";
import { v4 as uuidv4 } from "uuid";

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
export class AddCoursePageComponent implements OnDestroy {
    course: Course = _.cloneDeep(emptyCourse);
    authorsFormControl = new FormControl(this.course.authors);
    readonly search$ = new BehaviorSubject<string | null>(null);
    readonly items$: Observable<readonly string[] | null> = this.search$.pipe(
        filter((value) => value !== null),
        switchMap((search) => this.serverRequest(search).pipe(startWith(null))),
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
        this.assignUniqueIdAndAuthors();
        this.createCourseAndNavigate();
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

    ngOnDestroy(): void {
        this.resetCourse();
    }

    private assignUniqueIdAndAuthors(): void {
        this.course.id = uuidv4();
        this.course.authors = this.authorsFormControl.value ?? [];
    }

    private createCourseAndNavigate(): void {
        this.courseService
            .createCourse$(this.course)
            .pipe(
                catchError(() => {
                    throw new Error(`Ошибка при создании курса`);
                }),
                finalize(() => {
                    this.loadingService.hide();
                })
            )
            .subscribe({
                complete: () => {
                    void this.router.navigate(["/courses"]);
                },
            });
    }

    private resetCourse(): void {
        this.course = { ...emptyCourse };
    }

    private serverRequest(searchQuery: string | null): Observable<readonly string[]> {
        const result = authors.filter((user) => TUI_DEFAULT_MATCHER(user, searchQuery ?? ""));

        return of(result).pipe(delay(1000));
    }
}
