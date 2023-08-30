import { Injectable } from "@angular/core";
import { BehaviorSubject, delay, map, Observable, of, tap } from "rxjs";

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

    login$(username: string, password: string): Observable<null> {
        return of(null).pipe(
            delay(1000),
            // Оператор map используется, чтобы преобразовать значения в потоке, тут надо юзать tap (сайд действия)
            tap(() => {
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
