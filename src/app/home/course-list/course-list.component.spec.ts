import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { CourseComponent } from './course/course.component';
import { CourseListComponent } from './course-list.component';
import { courses } from './courses-mock';
import { LoadMoreComponent } from './load-more/load-more.component';

describe('CourseListComponent', () => {
  let component: CourseListComponent;
  let fixture: ComponentFixture<CourseListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CourseListComponent, LoadMoreComponent, CourseComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseListComponent);
    component = fixture.componentInstance;
  });

  it('should not display any course component if courses array is empty', () => {
    component.courses = [];
    fixture.detectChanges();
    const courseComponents =
      fixture.nativeElement.querySelectorAll('app-course');

    expect(courseComponents.length).toBe(0);
  });

  it('should display the "Load more" button even if courses array is empty', () => {
    component.courses = [];
    fixture.detectChanges();
    const loadMoreButton = fixture.nativeElement.querySelector('app-load-more');

    expect(loadMoreButton).toBeTruthy();
  });

  it('should display at least one course component when courses array is not empty', () => {
    component.courses = [courses[0]]; // Assuming the first course from the mock data
    fixture.detectChanges();
    const courseComponents =
      fixture.nativeElement.querySelectorAll('app-course');

    expect(courseComponents.length).toBeGreaterThanOrEqual(1);
  });

  it('should display the same number of course components as the length of courses array', () => {
    component.courses = courses;
    fixture.detectChanges();
    const courseComponents =
      fixture.nativeElement.querySelectorAll('app-course');

    expect(courseComponents.length).toBe(component.courses.length);
  });

  it('should call the deleteCourse method once with the course ID as the argument when a course component emits the courseDeleted event', () => {
    component.courses = [courses[0]];
    const courseId = courses[0].id;

    fixture.detectChanges();

    const deleteCourseSpy = jest.spyOn(component, 'onCourseDeleted');
    const courseComponent = fixture.debugElement.query(By.css('app-course'));

    courseComponent.triggerEventHandler('courseDeleted', courseId);

    expect(deleteCourseSpy).toHaveBeenCalledTimes(1);
    expect(deleteCourseSpy).toHaveBeenCalledWith(courseId);
  });
});
