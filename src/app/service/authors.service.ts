import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

import { BACKEND_URL } from "../config";

@Injectable({
    providedIn: "root",
})
export class AuthorsService {
    private authors$: BehaviorSubject<string[]> | null = null;

    constructor(private readonly http: HttpClient) {}

    getAuthors$(): Observable<string[]> {
        if (this.authors$ === null) {
            this.authors$ = new BehaviorSubject<string[]>([]);
            this.loadAuthors$().subscribe({
                next: (response) => {
                    if (this.authors$ !== null) {
                        this.authors$.next(response);
                    }
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
