import {AfterViewInit, Component, ViewChild} from "@angular/core";
import {TuiDestroyService} from "@taiga-ui/cdk";
import {debounceTime, filter, finalize, fromEvent, switchMap, takeUntil, tap} from "rxjs";

import {CoursesService} from "../../service/courses.service";
import {LoadingService} from "../../loading-overlay/loading.service";

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

    constructor(private readonly coursesService: CoursesService, private readonly destroy$: TuiDestroyService, private readonly loadingService: LoadingService) {
    }

    ngAfterViewInit(): void {
        fromEvent(this.searchInput.el.nativeElement, "keyup")
            .pipe(
                debounceTime(300),
                filter(() => this.searchInput.el.nativeElement.value.length >= 3),
                tap(() => {
                    this.searchInput.el.nativeElement.disabled = true;
                    this.loadingService.show();
                }),
                switchMap(() => this.coursesService.loadCourses$(this.searchInput.el.nativeElement.value)
                    .pipe(
                        finalize(() => {
                            this.loadingService.hide();
                            this.searchInput.el.nativeElement.disabled = false;
                        }),
                    )
                ),
                takeUntil(this.destroy$)
            )
            .subscribe();
    }
}

