import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { courses } from '../courses-mock';
import { CourseComponent } from './course.component';

describe('CourseComponent', () => {
  let component: CourseComponent;
  let fixture: ComponentFixture<CourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CourseComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(CourseComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    component.course = courses[1];

    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
