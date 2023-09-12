import {AfterContentInit, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Course} from "../courses-page/course-list/course/course";
import {TUI_DEFAULT_MATCHER, TuiDay, tuiPure} from "@taiga-ui/cdk";
import {Location} from '@angular/common';
import {CoursesService} from "../service/courses.service";
import {authors} from "../courses-page/course-list/authors-mock";
import {delay, filter, Observable, of, startWith, Subject, switchMap} from "rxjs";
import {FormControl} from "@angular/forms";

@Component({
    selector: 'app-edit-course-page',
    templateUrl: './edit-course-page.component.html',
    styleUrls: ['./edit-course-page.component.less', "../app.component.less"],
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

    searchValue: string | null = '';
    readonly search$ = new Subject<string | null>();
    items$: Observable<readonly string[] | null> = this.search$.pipe(
        filter(value => value !== null),
        switchMap(search =>
            this.serverRequest(search).pipe(startWith<readonly string[] | null>(null)),
        ),
        startWith(authors),
    );

    readonly authorsValue = new FormControl(this.course.authors);

    constructor(
        private readonly activatedRoute: ActivatedRoute,
        private readonly location: Location,
        private readonly router: Router,
        private readonly courseService: CoursesService
    ) {
    }

    ngOnInit(): void {
        this.activatedRoute.paramMap.subscribe((params) => {
            const id = params.get('id');
            if (id) {
                const course = this.courseService.getCourse(id).shift();
                if (course) {
                    this.course = course;
                } else {
                    this.router.navigate(['/404']);
                }
            }
        });
    }

    onSearchChange(searchQuery: string | null): void {
        this.searchValue = searchQuery;
        this.search$.next(searchQuery);
    }

    onClickSave(updatedCourse: Course): void {
        this.courseService.updateCourse(updatedCourse);
        this.router.navigate(['/courses'])
    }

    onClickCancel(): void {
        this.location.back();
    }

    onEnterCreateAuthor(event: any): void {
        if (event.key === "Enter" && this.searchValue) {
            authors.push(this.searchValue);
            this.authorsValue.setValue([...this.authorsValue.value!, this.searchValue]);
        }
    }

    /**
     * Server request emulation
     */
    private serverRequest(searchQuery: string | null): Observable<readonly string[]> {
        const result = authors.filter(user =>
            TUI_DEFAULT_MATCHER(user, searchQuery || ''),
        );

        return of(result).pipe(delay(1000));
    }
}
