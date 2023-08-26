import {AfterViewInit, Component, OnDestroy, ViewChild} from "@angular/core";
import {CoursesService} from "../../service/courses.service";
import {debounceTime, filter, fromEvent, switchMap, takeUntil} from "rxjs";
import {TuiDestroyService} from "@taiga-ui/cdk";

@Component({
    selector: "app-search",
    templateUrl: "./search.component.html",
    styleUrls: ["./search.component.less"],
})
export class SearchComponent implements AfterViewInit, OnDestroy {

    @ViewChild('searchInput')
    searchInput: any;

    constructor(private coursesService: CoursesService, private destroy$: TuiDestroyService) {
    }

    ngAfterViewInit(): void {
        fromEvent(this.searchInput.el.nativeElement, 'keyup')
            .pipe(
                debounceTime(300),
                filter(() => this.searchInput.el.nativeElement.value.length >= 3),
                switchMap(() => this.coursesService.loadCourses$(this.searchInput.el.nativeElement.value)),
                takeUntil(this.destroy$)
            )
            .subscribe();
    }

    ngOnDestroy(): void {
        this.destroy$.unsubscribe();
    }
}
