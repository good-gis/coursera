import { Component } from '@angular/core';

import { courses } from './courses-mock';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.less'],
})
export class CourseListComponent {
  courses = courses.sort((a, b) => {
    const dateA = new Date(a.creationDate);
    const dateB = new Date(b.creationDate);

    return dateA.getTime() - dateB.getTime();
  });

  onCourseDeleted(courseId: string): void {
    // eslint-disable-next-line no-console
    console.log('Удален курс с id:', courseId);
  }
}
