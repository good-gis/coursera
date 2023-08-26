import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

import { AuthService } from "../service/auth.service";
import {LoadingService} from "../loading-overlay/loading.service";

@Component({
    selector: "app-login-page",
    templateUrl: "./login-page.component.html",
    styleUrls: ["./login-page.component.less"],
})
export class LoginPageComponent {
    authForm = new FormGroup({
        email: new FormControl("", [Validators.required, Validators.email]),
        password: new FormControl("", [Validators.required]),
    });

    constructor(private readonly authService: AuthService, private loadingService: LoadingService) {}

    login(): void {
        if (this.authForm.valid) {
            const email = this.authForm.get("email")?.value;
            const password = this.authForm.get("password")?.value;

            if (email && password) {
                this.loadingService.show();
                this.authService.login(email, password);
                setInterval(() => {
                    this.loadingService.hide();
                }, 1000);
            }
        }
    }
}
