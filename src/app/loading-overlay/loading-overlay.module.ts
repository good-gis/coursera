import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingOverlayComponent } from './loading-overlay.component';
import {TuiLoaderModule} from "@taiga-ui/core";



@NgModule({
    declarations: [
        LoadingOverlayComponent
    ],
    exports: [
        LoadingOverlayComponent
    ],
    imports: [
        CommonModule,
        TuiLoaderModule
    ]
})
export class LoadingOverlayModule { }
