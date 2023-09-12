import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EditCoursePageComponent} from './edit-course-page.component';
import {TuiDataListWrapperModule, TuiInputDateModule, TuiInputModule, TuiInputNumberModule, TuiMultiSelectModule, TuiTextAreaModule} from "@taiga-ui/kit";
import {HeaderModule} from "../header/header.module";
import {FooterModule} from "../footer/footer.module";
import {TuiButtonModule, TuiLabelModule, TuiTextfieldControllerModule} from "@taiga-ui/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedPipesModule} from "../shared-pipes/shared-pipes.module";
import {TuiLetModule} from "@taiga-ui/cdk";


@NgModule({
    declarations: [
        EditCoursePageComponent
    ],
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
export class EditCoursePageModule {
}
