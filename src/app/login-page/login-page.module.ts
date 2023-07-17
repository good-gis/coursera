import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { FooterModule } from "../footer/footer.module";
import { LoginPageComponent } from "./login-page/login-page.component";

@NgModule({
    declarations: [LoginPageComponent],
    exports: [LoginPageComponent],
    imports: [CommonModule, FooterModule, FormsModule],
})
export class LoginPageModule {}
