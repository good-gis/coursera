import { Component } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.less'],
})
export class SearchComponent {
  public searchValue = '';

  onClickSearch(value: string) {
    console.log(value);
  }
}
