import { Injectable } from "@angular/core";
import { BehaviorSubject, delay, map, Observable, of, tap } from "rxjs";

import { Course } from "../courses-page/course-list/course/course";
import { courses } from "../courses-page/course-list/courses-mock";
import { FilterPipe } from "../courses-page/search/filter.pipe";

@Injectable({
    providedIn: "root",
})
export class CoursesService {
    private readonly courses$: BehaviorSubject<Course[]> = new BehaviorSubject<Course[]>(courses);
    private readonly filterPipe = new FilterPipe();

    loadCourses$(filterString?: string): Observable<null> {
        if (!filterString) {
            this.courses$.next(courses);

            return of(null);
        }

        return of(null).pipe(
            tap(() => {
                this.courses$.next([]);
            }),
            delay(1000),
            tap(() => {
                const filteredCourses = this.filterPipe.transform(courses, filterString);

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
