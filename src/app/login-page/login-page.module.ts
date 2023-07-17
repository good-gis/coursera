import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TuiButtonModule, TuiTextfieldControllerModule } from "@taiga-ui/core";
import { TuiInputModule, TuiInputPasswordModule } from "@taiga-ui/kit";

import { FooterModule } from "../footer/footer.module";
import { LoginPageComponent } from "./login-page/login-page.component";

@NgModule({
    declarations: [LoginPageComponent],
    exports: [LoginPageComponent],
    imports: [
        CommonModule,
        FooterModule,
        FormsModule,
        TuiInputPasswordModule,
        ReactiveFormsModule,
        TuiInputModule,
        TuiTextfieldControllerModule,
        TuiButtonModule,
    ],
})
export class LoginPageModule {}
