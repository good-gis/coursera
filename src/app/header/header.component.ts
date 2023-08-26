import {Component} from "@angular/core";

import {AuthService} from "../service/auth.service";
import {Observable} from "rxjs";
import {LoadingService} from "../loading-overlay/loading.service";

@Component({
    selector: "app-header",
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.less"],
})
export class HeaderComponent {
    username$: Observable<string | null>;

    constructor(private readonly authService: AuthService, private loadingService: LoadingService) {
        this.username$ = this.authService.getUserInfo$();
    }

    logout(): void {
        this.loadingService.show();
        this.authService.logout();
        setInterval(() => {
            this.loadingService.hide();
        }, 1000);
    }
}
