import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

import { BACKEND_URL } from "../config";

@Injectable({
    providedIn: "root",
})
export class AuthorsService {
    private readonly authors$ = new BehaviorSubject<string[]>([]);
    private loaded = false;

    constructor(private readonly http: HttpClient) {}

    getAuthors$(): Observable<string[]> {
        if (!this.loaded) {
            this.loadAuthors$().subscribe({
                next: (response) => {
                    this.authors$.next(response);
                    this.loaded = true;
                },
                error: (err: unknown) => {
                    console.error("Error loading authors:", err);
                },
            });
        }

        return this.authors$.asObservable();
    }

    private loadAuthors$(): Observable<string[]> {
        const url = `${BACKEND_URL}/authors`;

        return this.http.get<string[]>(url);
    }
}
