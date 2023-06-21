import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { courses } from '../courses-mock';
import { Course } from './course';
import { CourseComponent } from './course.component';

describe('CourseComponent', () => {
  let component: CourseComponent;
  let fixture: ComponentFixture<CourseComponent>;
  const course: Course = courses[0];

  beforeEach(() => {
    void TestBed.configureTestingModule({
      declarations: [CourseComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(CourseComponent);
    component = fixture.componentInstance;

    component.course = course;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display creation date', () => {
    const dateElement = fixture.debugElement.query(By.css('.date'));

    expect(dateElement).toBeTruthy();
  });

  it('should display description', () => {
    const descriptionElement = fixture.debugElement.query(
      By.css('.description')
    );

    expect(descriptionElement).toBeTruthy();
  });

  it('should display course title', () => {
    const titleElement = fixture.debugElement.query(By.css('.title'));

    expect(titleElement).toBeTruthy();
  });

  it('should display course duration badge', () => {
    const durationElement = fixture.debugElement.query(By.css('.duration'));

    expect(durationElement).toBeTruthy();
  });

  it('should display "Edit" button', () => {
    const editButton = fixture.debugElement.query(By.css('.edit'));

    expect(editButton).toBeTruthy();
  });

  it('should display "Delete" button', () => {
    const deleteButton = fixture.debugElement.query(By.css('.delete'));

    expect(deleteButton).toBeTruthy();
  });

  it('should emit course id when "Delete" button is clicked', () => {
    jest.spyOn(component.courseDeleted, 'emit');

    const deleteButton = fixture.debugElement.query(
      By.css('.delete')
    ).nativeElement;

    deleteButton.click();

    expect(component.courseDeleted.emit).toHaveBeenCalledWith(course.id);
  });
});
