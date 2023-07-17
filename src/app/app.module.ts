import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterLink } from "@angular/router";
import {
    TUI_SANITIZER,
    TuiAlertModule,
    TuiButtonModule,
    TuiDialogModule,
    TuiLinkModule,
    TuiRootModule,
    TuiSvgModule,
    TuiTextfieldControllerModule,
} from "@taiga-ui/core";
import { TuiBadgeModule, TuiInputModule, TuiLineClampModule, TuiMarkerIconModule } from "@taiga-ui/kit";
import { NgDompurifySanitizer } from "@tinkoff/ng-dompurify";

import { AppComponent } from "./app.component";
import { CoursesPageModule } from "./courses-page/courses-page.module";

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        FormsModule,
        BrowserAnimationsModule,
        TuiRootModule,
        TuiDialogModule,
        TuiAlertModule,
        TuiLinkModule,
        RouterLink,
        TuiSvgModule,
        TuiButtonModule,
        TuiInputModule,
        TuiTextfieldControllerModule,
        TuiLineClampModule,
        TuiBadgeModule,
        TuiMarkerIconModule,
        CoursesPageModule,
    ],
    providers: [{ provide: TUI_SANITIZER, useClass: NgDompurifySanitizer }],
    bootstrap: [AppComponent],
})
export class AppModule {}
