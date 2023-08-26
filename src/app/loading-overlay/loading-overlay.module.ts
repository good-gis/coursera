import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { TuiLoaderModule } from "@taiga-ui/core";

import { LoadingOverlayComponent } from "./loading-overlay.component";

@NgModule({
    declarations: [LoadingOverlayComponent],
    exports: [LoadingOverlayComponent],
    imports: [CommonModule, TuiLoaderModule],
})
export class LoadingOverlayModule {}
