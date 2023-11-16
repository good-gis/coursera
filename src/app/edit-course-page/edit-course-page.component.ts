import { Location } from "@angular/common";
import { AfterContentInit, Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { TUI_DEFAULT_MATCHER, tuiIsFalsy } from "@taiga-ui/cdk";
import { TUI_VALIDATION_ERRORS } from "@taiga-ui/kit";
import { BehaviorSubject, debounceTime, filter, finalize, interval, map, Observable, of, scan, startWith, switchMap, tap } from "rxjs";

import { Course } from "../courses-page/course-list/course/course";
import { LoadingService } from "../loading-overlay/loading.service";
import { AuthorsService } from "../service/authors.service";
import { CoursesService } from "../service/courses.service";

@Component({
    selector: "app-edit-course-page",
    templateUrl: "./edit-course-page.component.html",
    styleUrls: ["./edit-course-page.component.less", "../app.component.less"],
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
export class EditCoursePageComponent implements OnInit, AfterContentInit {
    protected courseForm: FormGroup;
    protected isCourseExist = false;
    authors$: Observable<string[]> = this.authorsService.getAuthors$();
    readonly search$ = new BehaviorSubject<string | null>(null);
    readonly items$: Observable<string[] | null> = this.search$.pipe(
        filter((value) => value !== null),
        switchMap((search) => this.filterAuthors(search))
    );

    constructor(
        private readonly activatedRoute: ActivatedRoute,
        private readonly location: Location,
        private readonly router: Router,
        private readonly courseService: CoursesService,
        private readonly loadingService: LoadingService,
        private readonly authorsService: AuthorsService,
        private readonly fb: FormBuilder
    ) {
        this.courseForm = this.fb.group({
            id: [""],
            title: [""],
            description: [""],
            publicationDate: [""],
            duration: ["", [Validators.required]],
            authors: [[[]], [Validators.required, Validators.min(1)]],
        });
    }

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
                tap((course) => {
                    if (course) {
                        this.courseForm.patchValue({
                            id: course.id,
                            title: course.title,
                            description: course.description,
                            publicationDate: course.publicationDate,
                            duration: course.duration,
                            authors: course.authors,
                        });
                        this.isCourseExist = true;
                    } else {
                        this.isCourseExist = false;
                    }
                })
            )
            .subscribe();
        this.search$.next("");
    }

    ngAfterContentInit(): void {
        if (!this.isCourseExist) {
            void this.router.navigate(["/404"]);
        }
    }

    onSearchChange(searchQuery: string | null): void {
        this.search$.next(searchQuery);
    }

    onClickSave(updatedCourse: Course): void {
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
            const currentAuthors = this.courseForm.get("authors")?.value;

            this.courseForm.patchValue({
                authors: [...currentAuthors, this.search$.value],
            });
        }
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
