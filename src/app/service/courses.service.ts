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
    private readonly filterPipe = new FilterPipe();

    loadCourses$(filterString?: string): Observable<void> {
        if (!filterString) {
            return EMPTY;
        }

        console.log(filterString);
        const filteredCourses = this.filterPipe.transform(courses, filterString);
        this.coursesSubject.next(Object.values(filteredCourses));

        return EMPTY;
    }

    getCourses$(): Observable<Course[]> {
        return this.coursesSubject.asObservable();
    }
    deleteCourse(id: string): void {
        const coursesArray = this.coursesSubject.getValue();
        const updatedCourses = coursesArray.filter(course => course.id !== id);

        this.coursesSubject.next(updatedCourses);
    }
}
