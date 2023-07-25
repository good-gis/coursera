import { Component } from "@angular/core";

import { AuthService } from "./service/auth.service";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.less"],
})
export class AppComponent {
    title = "angular-course";
    constructor(private readonly _authService: AuthService) {}

    get isAuthorized(): boolean {
        return this._authService.isAuthorized();
    }
}
