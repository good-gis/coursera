import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TuiLetModule } from "@taiga-ui/cdk";
import { TuiButtonModule, TuiLabelModule, TuiTextfieldControllerModule } from "@taiga-ui/core";
import { TuiDataListWrapperModule, TuiInputDateModule, TuiInputModule, TuiInputNumberModule, TuiMultiSelectModule, TuiTextAreaModule } from "@taiga-ui/kit";

import { FooterModule } from "../footer/footer.module";
import { HeaderModule } from "../header/header.module";
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
    ],
    exports: [EditCoursePageComponent],
})
export class EditCoursePageModule {}
