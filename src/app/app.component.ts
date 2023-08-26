import {Component} from "@angular/core";

import {AuthService} from "./service/auth.service";
import {Observable} from "rxjs";

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
