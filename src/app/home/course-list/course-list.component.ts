import { Component } from '@angular/core';
import { courses } from './courses-mock';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.less'],
})
export class CourseListComponent {
  public courses = courses.sort((a, b) => {
    const dateA = this.parseDate(a.creationDate);
    const dateB = this.parseDate(b.creationDate);
    return dateA.getTime() - dateB.getTime();
  });

  // Для формата даты 'MM.DD.YYYY'
  protected parseDate(dateString: string): Date {
    const parts = dateString.split('.');

    const day = parseInt(parts[1], 10);
    const month = parseInt(parts[0], 10) - 1;
    const year = parseInt(parts[2], 10);
    return new Date(year, month, day);
  }

  onCourseDeleted(courseId: string): void {
    console.log('Удален курс с id:', courseId);
  }
}
