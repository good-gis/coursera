import { Pipe, PipeTransform } from '@angular/core';
import {Course} from "../course-list/course/course";

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(courses: Course[], searchText: string): any[] {
    if (!courses || !searchText) {
      return courses;
    }

    searchText = searchText.toLowerCase();

    return courses.filter(course => course.title.toLowerCase().includes(searchText));
  }
}
