import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { TuiButtonModule, TuiLabelModule, TuiTextfieldControllerModule } from "@taiga-ui/core";
import { TuiDataListWrapperModule, TuiInputDateModule, TuiInputModule, TuiInputNumberModule, TuiMultiSelectModule, TuiTextAreaModule } from "@taiga-ui/kit";

import { FooterModule } from "../footer/footer.module";
import { HeaderModule } from "../header/header.module";
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
    ],
    exports: [AddCoursePageComponent],
})
export class AddCoursePageModule {}
