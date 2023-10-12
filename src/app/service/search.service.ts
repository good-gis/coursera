import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class SearchService {
    private readonly searchQuery$ = new BehaviorSubject<string>("");

    setSearchQuery(query: string): void {
        this.searchQuery$.next(query);
    }

    getSearchQuery(): Observable<string> {
        return this.searchQuery$.asObservable();
    }
}
