import { Component } from "@angular/core";

import { LoadingService } from "./loading.service";

@Component({
    selector: "app-loading-overlay",
    templateUrl: "./loading-overlay.component.html",
    styleUrls: ["./loading-overlay.component.less"],
})
export class LoadingOverlayComponent {
    isLoading$ = this.loadingService.isLoading$;
    constructor(private readonly loadingService: LoadingService) {}
}
