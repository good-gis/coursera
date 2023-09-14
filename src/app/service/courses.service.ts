import { Injectable } from "@angular/core";
import { BehaviorSubject, delay, EMPTY, Observable, of, tap } from "rxjs";

import { Course } from "../courses-page/course-list/course/course";
import { courses } from "../courses-page/course-list/courses-mock";
import { FilterPipe } from "../courses-page/search/filter.pipe";

@Injectable({
    providedIn: "root",
})
export class CoursesService {
    private readonly courses$: BehaviorSubject<Course[]> = new BehaviorSubject<Course[]>([]);
    private readonly filterPipe = new FilterPipe();

    loadCourses$(filterString?: string): Observable<null> {
        if (!filterString) {
            return EMPTY;
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

    getCourse(id: string): Course[] {
        const coursesArray = this.courses$.getValue();

        return coursesArray.filter((course) => course.id === id);
    }

    updateCourse(updatedCourse: Course): void {
        const coursesArray = this.courses$.getValue();
        let course = coursesArray.find((obj) => obj.id === updatedCourse.id);

        if (course) {
            course = updatedCourse;
            this.courses$.next(coursesArray);
        }
    }

    deleteCourse(id: string): void {
        const coursesArray = this.courses$.getValue();
        const updatedCourses = coursesArray.filter((course) => course.id !== id);

        this.courses$.next(updatedCourses);
    }
}
