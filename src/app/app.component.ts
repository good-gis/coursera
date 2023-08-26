import { Component } from "@angular/core";
import { Observable } from "rxjs";

import { AuthService } from "./service/auth.service";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.less"],
})
export class AppComponent {
    title = "angular-course";
    isAuthorized$: Observable<boolean>;

    constructor(private readonly authService: AuthService) {
        this.isAuthorized$ = this.authService.isAuthorized$();
    }
}
