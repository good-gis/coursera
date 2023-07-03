import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.less'],
})
export class SearchComponent {

  @Output()
  search: EventEmitter<string> = new EventEmitter<string>();
  searchValue = '';

  onClickSearch(): void {
    this.search.emit(this.searchValue)
  }
}
