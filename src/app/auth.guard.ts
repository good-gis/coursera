import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { map, Observable, take } from "rxjs";

import { AuthService } from "./service/auth.service";

@Injectable({
    providedIn: "root",
})
export class AuthGuard implements CanActivate {
    constructor(private readonly authService: AuthService, private readonly router: Router) {}

    canActivate(): Observable<boolean> {
        return this.authService.isAuthorized$().pipe(
            take(1),
            map((isAuthorized) => {
                if (isAuthorized) {
                    return true;
                }

                void this.router.navigate(["/login"]);

                return false;
            })
        );
    }
}
