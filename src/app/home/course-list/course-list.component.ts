import { Component, Input } from '@angular/core';

import { Course } from './course/course';
import { courses } from './courses-mock';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.less'],
})
export class CourseListComponent {
  @Input()
  searchText!: string;

  courses: Course[] = courses.sort((a, b) => {
    const dateA = a.creationDate;
    const dateB = b.creationDate;

    return dateB.getTime() - dateA.getTime();
  });

  get filteredCourses(): Course[] {
    if (!this.searchText) {
      return this.courses;
    }

    return this.courses.filter((course) =>
      course.title.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  onCourseDeleted(courseId: string): void {
    // eslint-disable-next-line no-console
    console.log('Удален курс с id:', courseId);
  }
}
