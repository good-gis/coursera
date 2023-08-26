import {Injectable} from "@angular/core";
import {Course} from "../courses-page/course-list/course/course";
import {courses} from "../courses-page/course-list/courses-mock";
import {BehaviorSubject, EMPTY, Observable} from "rxjs";
import {FilterPipe} from "../courses-page/search/filter.pipe";

@Injectable({
    providedIn: "root",
})
export class CoursesService {
    private coursesSubject: BehaviorSubject<Course[]> = new BehaviorSubject<Course[]>([]);
    private courses: Record<string, Course> = {};
    private readonly filterPipe = new FilterPipe();

    constructor() {
        this.initializeCourses();
    }

    loadCourses$(filterString?: string): Observable<void> {
        if (!filterString) {
            return EMPTY;
        }
        this.courses = {};
        const filteredCourses = this.filterPipe.transform(courses, filterString);
        filteredCourses.forEach((course) => {
            this.courses[course.id] = course;
        });

        this.coursesSubject.next(Object.values(this.courses));

        return EMPTY;
    }

    getCourses$(): Observable<Course[]> {
        return this.coursesSubject.asObservable();
    }

    getCourseById(id: string): Course | undefined {
        return this.courses[id];
    }

    addCourse(course: Course): void {
        this.courses[course.id] = course;
        this.coursesSubject.next(Object.values(this.courses));
    }

    updateCourse(id: string, data: Course): void {
        if (!this.courses[id]) {
            throw new Error(`Course with ID ${id} not found.`);
        }

        this.courses[id] = {...this.courses[id], ...data};
        this.coursesSubject.next(Object.values(this.courses));
    }

    deleteCourse(id: string): void {
        delete this.courses[id];
        this.coursesSubject.next(Object.values(this.courses));
    }

    private initializeCourses(): void {
        courses.forEach((course) => {
            this.courses[course.id] = course;
        });
        this.coursesSubject.next(Object.values(this.courses));
    }
}
