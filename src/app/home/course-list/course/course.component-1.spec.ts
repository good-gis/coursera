import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { courses } from '../courses-mock';
import { CourseComponent } from './course.component';

@Component({
  template: `
    <app-course
      [course]="course"
      (courseDeleted)="onCourseDeleted($event)"
    ></app-course>
  `,
})
class TestHostComponent {
  course: any;
  courseDeletedEvent = '';

  onCourseDeleted(event: string): void {
    this.courseDeletedEvent = event;
  }
}

describe('CourseComponentWithTestHost', () => {
  let testHost: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(() => {
    void TestBed.configureTestingModule({
      declarations: [CourseComponent, TestHostComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    testHost = fixture.componentInstance;

    testHost.course = courses[0];
    fixture.detectChanges();
  });

  it('should create the test host component', () => {
    expect(testHost).toBeTruthy();
  });

  it('should not display anything if no data is provided', () => {
    testHost.course = undefined;
    fixture.detectChanges();

    const courseElement = fixture.nativeElement.querySelector('.course');

    expect(courseElement).toBeFalsy();
  });

  it('should display content if data is provided', () => {
    const courseElement = fixture.nativeElement.querySelector('.course');

    expect(courseElement).toBeTruthy();
  });

  it('should emit courseDeleted event when delete button is clicked', () => {
    const deleteButton = fixture.nativeElement.querySelector('.delete');

    deleteButton.click();

    expect(testHost.courseDeletedEvent).toBe('1');
  });
});
