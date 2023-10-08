import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TuiLetModule } from "@taiga-ui/cdk";
import { TuiButtonModule, TuiLabelModule, TuiTextfieldControllerModule } from "@taiga-ui/core";
import { TuiDataListWrapperModule, TuiInputDateModule, TuiInputModule, TuiInputNumberModule, TuiMultiSelectModule, TuiTextAreaModule } from "@taiga-ui/kit";

import { FooterModule } from "../footer/footer.module";
import { HeaderModule } from "../header/header.module";
import { LoadingService } from "../loading-overlay/loading.service";
import { SharedPipesModule } from "../shared-pipes/shared-pipes.module";
import { AddCoursePageComponent } from "./add-course-page.component";

@NgModule({
    declarations: [AddCoursePageComponent],
    imports: [
        SharedPipesModule,
        CommonModule,
        FooterModule,
        TuiMultiSelectModule,
        TuiInputNumberModule,
        TuiInputDateModule,
        TuiTextAreaModule,
        TuiInputModule,
        HeaderModule,
        TuiTextfieldControllerModule,
        TuiButtonModule,
        FormsModule,
        TuiDataListWrapperModule,
        TuiLabelModule,
        TuiLetModule,
        ReactiveFormsModule,
    ],
    providers: [LoadingService],
    exports: [AddCoursePageComponent],
})
export class AddCoursePageModule {}
