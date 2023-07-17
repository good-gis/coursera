import { Injectable } from "@angular/core";

import { Course } from "../courses-page/courses-page/course-list/course/course";
import { courses } from "../courses-page/courses-page/course-list/courses-mock";

@Injectable({
    providedIn: "root",
})
export class CoursesService {
    private courses: Record<string, Course> = {};

    constructor() {
        this.initializeCourses();
    }

    getCourses(): Course[] {
        return Object.values(this.courses);
    }

    getCourseById(id: string): Course | undefined {
        return this.courses[id];
    }

    addCourse(course: Course): void {
        this.courses[course.id] = course;
    }

    updateCourse(id: string, data: Course): void {
        if (!this.courses[id]) {
            throw new Error(`Course with ID ${id} not found.`);
        }

        this.courses[id] = { ...this.courses[id], ...data };
    }

    deleteCourse(id: string): void {
        delete this.courses[id];
    }

    private initializeCourses(): void {
        courses.forEach((course) => {
            this.courses[course.id] = course;
        });
    }
}
