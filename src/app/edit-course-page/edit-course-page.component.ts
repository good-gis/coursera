import { Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { TUI_DEFAULT_MATCHER } from "@taiga-ui/cdk";
import { BehaviorSubject, debounceTime, filter, finalize, Observable, of, switchMap, tap } from "rxjs";

import { Course } from "../courses-page/course-list/course/course";
import { LoadingService } from "../loading-overlay/loading.service";
import { AuthorsService } from "../service/authors.service";
import { CoursesService } from "../service/courses.service";

@Component({
    selector: "app-edit-course-page",
    templateUrl: "./edit-course-page.component.html",
    styleUrls: ["./edit-course-page.component.less", "../app.component.less"],
})
export class EditCoursePageComponent implements OnInit {
    protected courseForm: FormGroup;
    protected authors: string[] = [];
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
            duration: ["", [Validators.required, Validators.min(1)]],
            authors: [[[]], [Validators.required]],
        });
        this.authorsService.getAuthors$().subscribe((authors) => {
            this.authors = authors;
        });
    }

    ngOnInit(): void {
        this.loadingService.show();
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
                debounceTime(2000),
                tap((course) => {
                    this.loadingService.hide();

                    if (course) {
                        this.courseForm.patchValue({
                            id: course.id,
                            title: course.title,
                            description: course.description,
                            publicationDate: course.publicationDate,
                            duration: course.duration,
                            authors: course.authors,
                        });
                    } else {
                        void this.router.navigate(["/404"]);
                    }
                })
            )
            .subscribe();

        this.authorsService.getAuthors$().subscribe((authors) => {
            this.authors = authors;
            this.search$.next("");
        });
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
            this.authors.push(this.search$.value);
            const currentAuthors = this.courseForm.get("authors")?.value;

            this.courseForm.patchValue({
                authors: [...currentAuthors, this.search$.value],
            });
        }
    }

    private filterAuthors(searchQuery: string | null): Observable<string[]> {
        const result = this.authors.filter((user) => TUI_DEFAULT_MATCHER(user, searchQuery ?? ""));

        return of(result);
    }
}
