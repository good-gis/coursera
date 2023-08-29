import { Injectable } from "@angular/core";
import {BehaviorSubject, delay, finalize, map, Observable, of, tap} from "rxjs";
import {courses} from "../courses-page/course-list/courses-mock";

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

    login$(username: string, password: string): Observable<void> {
        return of(null).pipe(
            delay(1000),
            map(() => {
                localStorage.setItem(this.usernameKey, username);
                localStorage.setItem(this.tokenKey, btoa(password));
                this.authorized$.next(true);
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
