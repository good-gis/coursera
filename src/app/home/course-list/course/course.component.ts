import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Course } from './course';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.less'],
})
export class CourseComponent {
  @Input()
  course!: Course;

  @Output()
  courseDeleted: EventEmitter<string> = new EventEmitter<string>();

  onDeleteClick(): void {
    this.courseDeleted.emit(this.course.id);
  }
}
