import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, map, Observable, of, tap } from "rxjs";

import { BACKEND_URL } from "../config";
import { Course } from "../courses-page/course-list/course/course";

@Injectable({
    providedIn: "root",
})
export class CoursesService {
    private readonly courses$: BehaviorSubject<Course[]> = new BehaviorSubject<Course[]>([]);
    private currentPage = 1;
    private readonly limit = 3;
    private isLastPage = false;
    private readonly url = `${BACKEND_URL}/courses`;

    constructor(private readonly http: HttpClient) {}

    loadCourses$(filterString = ""): Observable<Course[]> {
        if (this.isLastPage) {
            return of([]);
        }

        const params = new HttpParams()
            .set("_page", this.currentPage.toString())
            .set("_limit", this.limit.toString())
            .set("_sort", "creationDate")
            .set("_order", "desc")
            .set("q", filterString);

        return this.http.get<Course[]>(this.url, { params }).pipe(
            tap((response) => {
                if (response.length === 0) {
                    this.isLastPage = true;
                } else {
                    this.courses$.next([...this.courses$.value, ...response]);
                    this.currentPage++;
                }
            })
        );
    }

    getCourses$(): Observable<Course[]> {
        return this.courses$.asObservable();
    }

    clearCourses(): void {
        this.courses$.next([]);
        this.currentPage = 1;
        this.isLastPage = false;
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

    deleteCourse$(id: string): Observable<Record<string, any>> {
        return this.http.delete<Record<string, any>>(`${this.url}/${id}`).pipe(
            catchError((error: unknown) => {
                console.error("Error deleting course:", error);
                throw error;
            })
        );
    }
}
