import {Injectable} from "@angular/core";
import {BehaviorSubject, map, Observable} from "rxjs";

@Injectable({
    providedIn: "root",
})
export class AuthService {
    private readonly tokenKey = "token";
    private readonly usernameKey = "username";

    private authorizedSubject = new BehaviorSubject<boolean>(this.isAuthorized());

    isAuthorized$(): Observable<boolean> {
        return this.authorizedSubject.asObservable();
    }

    login(username: string, password: string): void {
        localStorage.setItem(this.usernameKey, username);
        localStorage.setItem(this.tokenKey, btoa(password));
        this.authorizedSubject.next(true);
    }

    logout(): void {
        localStorage.removeItem(this.usernameKey);
        localStorage.removeItem(this.tokenKey);
        this.authorizedSubject.next(false);
    }

    getUserInfo$(): Observable<string | null> {
        return this.authorizedSubject.asObservable().pipe(
            map(authorized => authorized ? localStorage.getItem(this.usernameKey) : null)
        );
    }

    private isAuthorized(): boolean {
        return !!localStorage.getItem(this.usernameKey) && !!localStorage.getItem(this.tokenKey);
    }
}
