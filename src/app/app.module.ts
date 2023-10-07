import { HttpClientModule } from "@angular/common/http";
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
import {
    TuiBadgeModule,
    TuiInputDateModule,
    TuiInputModule,
    TuiInputNumberModule,
    TuiLineClampModule,
    TuiMarkerIconModule,
    TuiTextAreaModule,
} from "@taiga-ui/kit";
import { NgDompurifySanitizer } from "@tinkoff/ng-dompurify";

import { AddCoursePageModule } from "./add-course-page/add-course-page.module";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { CoursesPageModule } from "./courses-page/courses-page.module";
import { EditCoursePageModule } from "./edit-course-page/edit-course-page.module";
import { FooterModule } from "./footer/footer.module";
import { HeaderModule } from "./header/header.module";
import { LoadingOverlayModule } from "./loading-overlay/loading-overlay.module";
import { LoginPageModule } from "./login-page/login-page.module";
import { NotFoundComponent } from "./not-found/not-found.component";
import { AuthService } from "./service/auth.service";

@NgModule({
    declarations: [AppComponent, NotFoundComponent],
    imports: [
        HttpClientModule,
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
        LoginPageModule,
        LoadingOverlayModule,
        HeaderModule,
        FooterModule,
        TuiTextAreaModule,
        TuiInputDateModule,
        TuiInputNumberModule,
        AddCoursePageModule,
        EditCoursePageModule,
        AppRoutingModule,
    ],
    providers: [{ provide: TUI_SANITIZER, useClass: NgDompurifySanitizer }, AuthService],
    bootstrap: [AppComponent],
})
export class AppModule {}
