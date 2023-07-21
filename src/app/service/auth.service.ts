import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root",
})
export class AuthService {
    private readonly tokenKey = "token";
    private readonly usernameKey = "username";

    login(username: string, password: string): void {
        localStorage.setItem(this.usernameKey, username);
        localStorage.setItem(this.tokenKey, btoa(password));
    }

    logout(): void {
        localStorage.removeItem(this.usernameKey);
        localStorage.removeItem(this.tokenKey);
    }

    isAuthorized(): boolean {
        return !!localStorage.getItem(this.usernameKey) && !!localStorage.getItem(this.tokenKey);
    }

    getUserInfo(): string | null {
        return localStorage.getItem(this.usernameKey);
    }
}
