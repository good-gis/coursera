import { Component } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.less'],
})
export class SearchComponent {
  searchValue = '';

  onClickSearch(value: string): void {
    // eslint-disable-next-line no-console
    console.log(value);
  }
}
