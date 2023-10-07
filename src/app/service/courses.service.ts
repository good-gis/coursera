import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable, of, tap } from "rxjs";

import { BACKEND_URL } from "../config";
import { Course } from "../courses-page/course-list/course/course";
import { FilterPipe } from "../courses-page/search/filter.pipe";

@Injectable({
    providedIn: "root",
})
export class CoursesService {
    private readonly courses$: BehaviorSubject<Course[]> = new BehaviorSubject<Course[]>([]);
    private readonly filterPipe = new FilterPipe();
    private cachedCoursesAll: Course[] = [];

    constructor(private readonly http: HttpClient) {}

    loadAllCourses$(): Observable<Course[]> {
        if (this.cachedCoursesAll.length > 0) {
            return of(this.cachedCoursesAll);
        }

        return this.http.get<Course[]>(`${BACKEND_URL}/courses`).pipe(
            tap((response) => {
                this.cachedCoursesAll = response;
                this.courses$.next(response);
            })
        );
    }

    loadCourses$(filterString?: string): Observable<null> {
        if (!filterString) {
            this.courses$.next(this.cachedCoursesAll);

            return of(null);
        }

        return of(null).pipe(
            tap(() => {
                const filteredCourses = this.filterPipe.transform(this.cachedCoursesAll, filterString);

                this.courses$.next(filteredCourses);
            })
        );
    }

    getCourses$(): Observable<Course[]> {
        return this.courses$.asObservable();
    }

    clearCourses(): void {
        this.courses$.next([]);
    }

    getCourse$(id: string): Observable<Course | undefined> {
        return this.courses$.pipe(map((coursesArray) => coursesArray.find((course) => course.id === id)));
    }

    updateCourse(updatedCourse: Course): void {
        const coursesArray = this.courses$.value;

        const updatedCourses = coursesArray.map((course) => {
            if (course.id === updatedCourse.id) {
                return updatedCourse;
            }

            return course;
        });

        this.courses$.next(updatedCourses);
    }

    deleteCourse(id: string): void {
        const coursesArray = this.courses$.getValue();
        const updatedCourses = coursesArray.filter((course) => course.id !== id);

        this.courses$.next(updatedCourses);
    }
}
