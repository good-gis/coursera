import { Component } from "@angular/core";

import { AuthService } from "../../service/auth.service";

@Component({
    selector: "app-login-page",
    templateUrl: "./login-page.component.html",
    styleUrls: ["./login-page.component.css"],
})
export class LoginPageComponent {
    email = "";

    constructor(private readonly authService: AuthService) {}

    login(): void {
        this.authService.login(this.email);
        // eslint-disable-next-line no-console
        console.log("Logged in successfully");
    }
}
