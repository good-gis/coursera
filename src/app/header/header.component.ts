import { Component } from "@angular/core";
import { Router } from "@angular/router";

import { AuthService } from "../service/auth.service";

@Component({
    selector: "app-header",
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.less"],
})
export class HeaderComponent {
    username$ = this.authService.getUserInfo$();

    constructor(private readonly authService: AuthService, private readonly router: Router) {}

    logout(): void {
        this.authService.logout();
        void this.router.navigate(["/login"]);
    }
}
