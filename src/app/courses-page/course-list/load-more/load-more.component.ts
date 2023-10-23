import { Component } from "@angular/core";
import { finalize, switchMap } from "rxjs";

import { LoadingService } from "../../../loading-overlay/loading.service";
import { CoursesService } from "../../../service/courses.service";
import { SearchService } from "../../../service/search.service";

@Component({
    selector: "app-load-more",
    templateUrl: "./load-more.component.html",
    styleUrls: ["./load-more.component.less"],
})
export class LoadMoreComponent {
    isLoading = false;

    constructor(
        private readonly loadingService: LoadingService,
        private readonly coursesService: CoursesService,
        private readonly searchService: SearchService
    ) {}

    onClickLoadMore(): void {
        this.loadingService.show();

        if (!this.isLoading) {
            this.isLoading = true;
            this.searchService
                .getSearchQuery()
                .pipe(
                    switchMap((query) => {
                        return this.coursesService.loadCourses$(query).pipe(
                            finalize(() => {
                                this.isLoading = false;
                                this.loadingService.hide();
                            })
                        );
                    })
                )
                .subscribe();
        }
    }
}
