import { Component } from "@angular/core";
import { Observable } from "rxjs";

import { LoadingService } from "./loading.service";

@Component({
    selector: "app-loading-overlay",
    templateUrl: "./loading-overlay.component.html",
    styleUrls: ["./loading-overlay.component.less"],
})
export class LoadingOverlayComponent {
    isLoading$: Observable<boolean>;
    constructor(private readonly loadingService: LoadingService) {
        this.isLoading$ = loadingService.isLoading$;
    }
}
