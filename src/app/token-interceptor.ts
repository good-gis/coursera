import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { AuthService } from "./service/auth.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private readonly authService: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const userToken = this.authService.getToken();
        const modifiedReq = req.clone({
            headers: req.headers.set("Token", `${userToken}`),
        });

        return next.handle(modifiedReq);
    }
}
