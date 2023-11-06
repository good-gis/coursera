import { Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { TUI_DEFAULT_MATCHER, TuiDay, tuiPure } from "@taiga-ui/cdk";
import { BehaviorSubject, catchError, filter, finalize, Observable, of, switchMap } from "rxjs";
import { v4 as uuidv4 } from "uuid";

import { Course } from "../courses-page/course-list/course/course";
import { LoadingService } from "../loading-overlay/loading.service";
import { AuthorsService } from "../service/authors.service";
import { CoursesService } from "../service/courses.service";

@Component({
    selector: "app-add-course-page",
    templateUrl: "./add-course-page.component.html",
    styleUrls: ["./add-course-page.component.less", "../app.component.less"],
})
export class AddCoursePageComponent implements OnInit {
    authors: string[] = [];
    courseForm: FormGroup;
    readonly search$ = new BehaviorSubject<string | null>(null);
    readonly items$: Observable<string[] | null> = this.search$.pipe(
        filter((value) => value !== null),
        switchMap((search) => this.filterAuthors(search))
    );

    constructor(
        private readonly location: Location,
        private readonly courseService: CoursesService,
        private readonly authorsService: AuthorsService,
        private readonly loadingService: LoadingService,
        private readonly router: Router,
        private readonly fb: FormBuilder
    ) {
        this.courseForm = this.fb.group({
            id: [uuidv4()],
            title: ["", Validators.required],
            description: ["", Validators.required],
            publicationDate: [new TuiDay(2022, 1, 1), Validators.required],
            duration: ["", Validators.required],
            authors: [[]],
        });
        this.authorsService.getAuthors$().subscribe((authors) => {
            this.authors = authors;
        });
    }

    @tuiPure
    filter(search: string | null): readonly string[] {
        return this.authors.filter((item) => TUI_DEFAULT_MATCHER(item, search ?? ""));
    }

    ngOnInit(): void {
        this.authorsService.getAuthors$().subscribe((authors) => {
            this.authors = authors;
            this.search$.next("");
        });
    }

    onSubmitClicked(): void {
        this.loadingService.show();
        const formData: Course = this.courseForm.value;

        this.createCourseAndNavigate(formData);
    }

    onSearchChange(searchQuery: string | null): void {
        this.search$.next(searchQuery);
    }

    onCancelClicked(): void {
        this.location.back();
    }

    onEnterCreateAuthor(event: any): void {
        if (event.key === "Enter" && this.search$.value) {
            this.authors.push(this.search$.value);
            const currentAuthors = this.courseForm.get("authors")?.value;

            this.courseForm.setValue({
                authors: [...currentAuthors, this.search$.value],
            });
        }
    }

    private createCourseAndNavigate(formData: Course): void {
        this.courseService
            .createCourse$(formData)
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

    private filterAuthors(searchQuery: string | null): Observable<string[]> {
        const result = this.authors.filter((user) => TUI_DEFAULT_MATCHER(user, searchQuery ?? ""));

        return of(result);
    }
}
