import { Component } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";

import { AuthService } from "../../service/auth.service";

@Component({
    selector: "app-login-page",
    templateUrl: "./login-page.component.html",
    styleUrls: ["./login-page.component.less"],
})
export class LoginPageComponent {
    authForm = new FormGroup({
        email: new FormControl(""),
        password: new FormControl(""),
    });

    constructor(private readonly authService: AuthService) {}

    login(): void {
        this.authService.login("Vasya Gubin");
        // eslint-disable-next-line no-console
        console.log("Logged in successfully");
    }
}
