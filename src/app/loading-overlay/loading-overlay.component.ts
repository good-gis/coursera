import { Component } from '@angular/core';
import {LoadingService} from "./loading.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-loading-overlay',
  templateUrl: './loading-overlay.component.html',
  styleUrls: ['./loading-overlay.component.less']
})
export class LoadingOverlayComponent {

    isLoading$: Observable<boolean>;
    constructor(private loadingService: LoadingService) {
        this.isLoading$ = loadingService.isLoading$;
    }
}
