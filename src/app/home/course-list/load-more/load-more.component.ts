import { Component } from "@angular/core";

@Component({
    selector: "app-load-more",
    templateUrl: "./load-more.component.html",
    styleUrls: ["./load-more.component.less"],
})
export class LoadMoreComponent {
    onClickLoadMore(): void {
        // eslint-disable-next-line no-console
        console.log("Load more button was pressed");
    }
}
