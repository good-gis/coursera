import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less'],
})
export class HomeComponent {
  searchText!: string;

  onClickSearch(query: string): void {
    this.searchText = query;
  }
}
