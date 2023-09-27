import { AfterViewInit, Component, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { TuiDestroyService } from "@taiga-ui/cdk";
import { debounceTime, finalize, fromEvent, switchMap, takeUntil, tap } from "rxjs";

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
        private readonly router: Router
    ) {}

    ngAfterViewInit(): void {
        fromEvent(this.searchInput.el.nativeElement, "keyup")
            .pipe(
                debounceTime(500),
                tap(() => {
                    this.searchInput.el.nativeElement.disabled = true;
                    this.loadingService.show();
                }),
                switchMap(() => {
                    const searchString = this.searchInput.el.nativeElement.value;

                    if (searchString.length < 3) {
                        return this.coursesService.loadCourses$().pipe(
                            finalize(() => {
                                this.loadingService.hide();
                                this.searchInput.el.nativeElement.disabled = false;
                            })
                        );
                    }

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
