import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable } from "rxjs";

import { BACKEND_URL } from "../config";

@Injectable({
    providedIn: "root",
})
export class AuthService {
    private readonly tokenKey = "token";
    private readonly usernameKey = "username";
    private readonly authorized$ = new BehaviorSubject<boolean>(this.isAuthorized());

    constructor(private readonly http: HttpClient) {}

    refreshAuthorizationState(): void {
        this.authorized$.next(this.isAuthorized());
    }

    isAuthorized$(): Observable<boolean> {
        return this.authorized$.asObservable();
    }

    login$(username: string, password: string): Observable<any> {
        const headers = new HttpHeaders({
            "Content-Type": "application/json",
            Code: btoa(`${username + password}`),
        });

        return this.http.get<{ token: string }>(`${BACKEND_URL}/token`, { headers }).pipe(
            map((response) => {
                if (response.token) {
                    localStorage.setItem(this.usernameKey, username);
                    localStorage.setItem(this.tokenKey, response.token);
                    this.authorized$.next(true);

                    return null;
                }

                throw new Error("Invalid auth response");
            })
        );
    }

    logout(): void {
        localStorage.clear();
        this.authorized$.next(false);
    }

    getUserInfo$(): Observable<string | null> {
        return this.authorized$.pipe(map((authorized) => (authorized ? localStorage.getItem(this.usernameKey) : null)));
    }

    private isAuthorized(): boolean {
        return !!localStorage.getItem(this.usernameKey) && !!localStorage.getItem(this.tokenKey);
    }
}
