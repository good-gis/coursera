import {Component} from "@angular/core";

import {AuthService} from "../service/auth.service";
import {Observable} from "rxjs";

@Component({
    selector: "app-header",
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.less"],
})
export class HeaderComponent {
    username$: Observable<string | null>;

    constructor(private readonly authService: AuthService) {
        this.username$ = this.authService.getUserInfo$();
    }

    logout(): void {
        this.authService.logout();
    }
}
