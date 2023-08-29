import { Injectable } from "@angular/core";
import { BehaviorSubject, delay, EMPTY, map, Observable, of } from "rxjs";

import { Course } from "../courses-page/course-list/course/course";
import { courses } from "../courses-page/course-list/courses-mock";
import { FilterPipe } from "../courses-page/search/filter.pipe";

@Injectable({
    providedIn: "root",
})
export class CoursesService {
    private readonly courses$: BehaviorSubject<Course[]> = new BehaviorSubject<Course[]>([]);
    private readonly filterPipe = new FilterPipe();

    loadCourses$(filterString?: string): Observable<void> {
        if (!filterString) {
            return EMPTY;
        }

        return of(null).pipe(
            map(() => {
                this.courses$.next([]);
            }),
            delay(1000),
            map(() => {
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

    deleteCourse(id: string): void {
        const coursesArray = this.courses$.getValue();
        const updatedCourses = coursesArray.filter((course) => course.id !== id);

        this.courses$.next(updatedCourses);
    }
}
