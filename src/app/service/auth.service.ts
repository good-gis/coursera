import { Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class AuthService {
    private readonly tokenKey = "token";
    private readonly usernameKey = "username";

    private readonly authorized$ = new BehaviorSubject<boolean>(this.isAuthorized());

    isAuthorized$(): Observable<boolean> {
        return this.authorized$.asObservable();
    }

    login(username: string, password: string): void {
        localStorage.setItem(this.usernameKey, username);
        localStorage.setItem(this.tokenKey, btoa(password));
        this.authorized$.next(true);
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
