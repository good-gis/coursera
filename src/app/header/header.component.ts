import { Component } from "@angular/core";

import { AuthService } from "../service/auth.service";

@Component({
    selector: "app-header",
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.less"],
})
export class HeaderComponent {
    username$ = this.authService.getUserInfo$();

    constructor(private readonly authService: AuthService) {}

    logout(): void {
        this.authService.logout();
    }
}
