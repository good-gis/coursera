import { AfterViewInit, Component, ViewChild } from "@angular/core";
import { TuiDestroyService } from "@taiga-ui/cdk";
import { debounceTime, filter, fromEvent, switchMap, takeUntil } from "rxjs";

import { CoursesService } from "../../service/courses.service";

@Component({
    selector: "app-search",
    templateUrl: "./search.component.html",
    styleUrls: ["./search.component.less"],
})
export class SearchComponent implements AfterViewInit {
    @ViewChild("searchInput")
    searchInput: any;

    uselessValue = "";

    constructor(private readonly coursesService: CoursesService, private readonly destroy$: TuiDestroyService) {}

    ngAfterViewInit(): void {
        fromEvent(this.searchInput.el.nativeElement, "keyup")
            .pipe(
                debounceTime(300),
                filter(() => this.searchInput.el.nativeElement.value.length >= 3),
                switchMap(() => this.coursesService.loadCourses$(this.searchInput.el.nativeElement.value)),
                takeUntil(this.destroy$)
            )
            .subscribe();
    }
}
