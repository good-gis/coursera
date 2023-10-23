import { AfterViewInit, Component, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { TuiDestroyService } from "@taiga-ui/cdk";
import { debounceTime, finalize, fromEvent, of, switchMap, takeUntil, tap } from "rxjs";
import { SearchService } from "src/app/service/search.service";

import { LoadingService } from "../../loading-overlay/loading.service";
import { CoursesService } from "../../service/courses.service";

@Component({
    selector: "app-search",
    templateUrl: "./search.component.html",
    styleUrls: ["./search.component.less"],
    providers: [TuiDestroyService],
})
export class SearchComponent implements AfterViewInit {
    @ViewChild("searchInput")
    searchInput: any;

    uselessValue = "";

    constructor(
        private readonly coursesService: CoursesService,
        private readonly destroy$: TuiDestroyService,
        private readonly loadingService: LoadingService,
        private readonly router: Router,
        private readonly searchService: SearchService
    ) {}

    ngAfterViewInit(): void {
        fromEvent(this.searchInput.el.nativeElement, "keyup")
            .pipe(
                debounceTime(1000),
                tap(() => {
                    this.searchInput.el.nativeElement.disabled = true;
                    this.loadingService.show();
                }),
                switchMap(() => {
                    const searchString = this.searchInput.el.nativeElement.value;

                    if (searchString.length < 3) {
                        if (searchString !== "") {
                            this.searchInput.el.nativeElement.disabled = false;
                            this.loadingService.hide();

                            return of(undefined);
                        }

                        this.searchService.setSearchQuery("");
                        this.coursesService.clearCourses();

                        return this.coursesService.loadCourses$().pipe(
                            finalize(() => {
                                this.loadingService.hide();
                                this.searchInput.el.nativeElement.disabled = false;
                            })
                        );
                    }

                    this.searchService.setSearchQuery(searchString);
                    this.coursesService.clearCourses();

                    return this.coursesService.loadCourses$(searchString).pipe(
                        finalize(() => {
                            this.loadingService.hide();
                            this.searchInput.el.nativeElement.disabled = false;
                        })
                    );
                }),
                takeUntil(this.destroy$)
            )
            .subscribe();
    }

    onAddCourseClick(): void {
        void this.router.navigate(["/courses/new"]);
    }
}
