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
import { CourseComponent } from "./home/course-list/course/course.component";
import { CourseBorderDirective } from "./home/course-list/course/course-border.directive";
import { DurationPipe } from "./home/course-list/course/duration.pipe";
import { CourseListComponent } from "./home/course-list/course-list.component";
import { LoadMoreComponent } from "./home/course-list/load-more/load-more.component";
import { FooterComponent } from "./home/footer/footer.component";
import { HeaderComponent } from "./home/header/header.component";
import { HomeComponent } from "./home/home.component";
import { FilterPipe } from "./home/search/filter.pipe";
import { SearchComponent } from "./home/search/search.component";

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        HeaderComponent,
        SearchComponent,
        CourseListComponent,
        CourseComponent,
        LoadMoreComponent,
        FooterComponent,
        DurationPipe,
        FilterPipe,
        CourseBorderDirective,
    ],
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
    ],
    providers: [{ provide: TUI_SANITIZER, useClass: NgDompurifySanitizer }],
    bootstrap: [AppComponent],
})
export class AppModule {}
