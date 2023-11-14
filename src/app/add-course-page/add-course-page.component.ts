import { Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { TUI_DEFAULT_MATCHER, TuiDay, tuiIsFalsy } from "@taiga-ui/cdk";
import { TUI_VALIDATION_ERRORS } from "@taiga-ui/kit";
import { BehaviorSubject, catchError, debounceTime, filter, finalize, interval, map, Observable, scan, startWith, switchMap } from "rxjs";
import { v4 as uuidv4 } from "uuid";

import { Course } from "../courses-page/course-list/course/course";
import { LoadingService } from "../loading-overlay/loading.service";
import { AuthorsService } from "../service/authors.service";
import { CoursesService } from "../service/courses.service";

@Component({
    selector: "app-add-course-page",
    templateUrl: "./add-course-page.component.html",
    styleUrls: ["./add-course-page.component.less", "../app.component.less"],
    providers: [
        {
            provide: TUI_VALIDATION_ERRORS,
            useValue: {
                required: "Enter this!",
                maxlength: ({ requiredLength }: { requiredLength: string }) => `Maximum length — ${requiredLength}`,
                min: interval(2000).pipe(
                    scan(tuiIsFalsy, false),
                    map((val) => (val ? "Fix please" : "Min number 1")),
                    startWith("Min number 1")
                ),
            },
        },
    ],
})
export class AddCoursePageComponent implements OnInit {
    authors$: Observable<string[]> = this.authorsService.getAuthors$();
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
            title: ["", [Validators.required, Validators.maxLength(50)]],
            description: ["", [Validators.required, Validators.maxLength(500)]],
            publicationDate: [new TuiDay(2022, 1, 1), Validators.required],
            duration: ["", [Validators.required, Validators.min(1)]],
            authors: [[], [Validators.required]],
        });
    }

    ngOnInit(): void {
        this.search$.next("");
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
            const currentAuthors = this.courseForm.get("authors")?.value;

            this.courseForm.patchValue({
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
        return this.authors$.pipe(
            map((authors) => {
                if (!searchQuery) {
                    return authors;
                }

                return authors.filter((author) => TUI_DEFAULT_MATCHER(author, searchQuery));
            }),
            debounceTime(300)
        );
    }
}
