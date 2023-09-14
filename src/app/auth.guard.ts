import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { map, Observable, take } from "rxjs";

import { AuthService } from "./service/auth.service";

export const authGuard: CanActivateFn = (): Observable<boolean> => {
    const authService = inject(AuthService);
    const router = inject(Router);

    authService.refreshAuthorizationState();

    return authService.isAuthorized$().pipe(
        take(1),
        map((isAuthorized) => {
            if (isAuthorized) {
                return true;
            }

            void router.navigate(["/login"]);

            return false;
        })
    );
};
