import { Component } from "@angular/core";

import { AuthService } from "../../service/auth.service";

@Component({
    selector: "app-header",
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.less"],
})
export class HeaderComponent {
    username: string | null;

    constructor(private readonly authService: AuthService) {
        this.username = this.authService.getUserInfo();
    }

    logout(): void {
        this.authService.logout();
        // eslint-disable-next-line no-console
        console.log("Logged out successfully");
    }
}
