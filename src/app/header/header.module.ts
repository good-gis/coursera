import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { TuiLinkModule } from "@taiga-ui/core";

import { AuthService } from "../service/auth.service";
import { HeaderComponent } from "./header/header.component";

@NgModule({
    declarations: [HeaderComponent],
    exports: [HeaderComponent],
    imports: [CommonModule, TuiLinkModule],
    providers: [AuthService],
})
export class HeaderModule {}
