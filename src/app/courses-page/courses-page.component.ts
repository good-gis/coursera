import { Component } from "@angular/core";

@Component({
    selector: "app-courses-page",
    templateUrl: "./courses-page.component.html",
    styleUrls: ["./courses-page.component.less"],
})
export class CoursesPageComponent {
    searchText!: string;

    onClickSearch(query: string): void {
        this.searchText = query;
    }
}
