import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TuiLetModule } from "@taiga-ui/cdk";
import { TuiButtonModule, TuiErrorModule, TuiLabelModule, TuiTextfieldControllerModule } from "@taiga-ui/core";
import {
    TuiDataListWrapperModule,
    TuiFieldErrorPipeModule,
    TuiInputDateModule,
    TuiInputModule,
    TuiInputNumberModule,
    TuiMultiSelectModule,
    TuiTextAreaModule,
} from "@taiga-ui/kit";

import { FooterModule } from "../footer/footer.module";
import { HeaderModule } from "../header/header.module";
import { LoadingService } from "../loading-overlay/loading.service";
import { SharedPipesModule } from "../shared-pipes/shared-pipes.module";
import { EditCoursePageComponent } from "./edit-course-page.component";

@NgModule({
    declarations: [EditCoursePageComponent],
    imports: [
        CommonModule,
        TuiInputModule,
        HeaderModule,
        TuiTextAreaModule,
        TuiInputDateModule,
        TuiInputNumberModule,
        FooterModule,
        TuiTextfieldControllerModule,
        TuiDataListWrapperModule,
        TuiMultiSelectModule,
        FormsModule,
        TuiButtonModule,
        TuiLabelModule,
        SharedPipesModule,
        TuiLetModule,
        ReactiveFormsModule,
        TuiFieldErrorPipeModule,
        TuiErrorModule,
    ],
    providers: [LoadingService],
    exports: [EditCoursePageComponent],
})
export class EditCoursePageModule {}
