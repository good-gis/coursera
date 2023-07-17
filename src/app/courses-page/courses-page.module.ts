import { CommonModule } from "@angular/common";
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

import { FooterModule } from "../footer/footer.module";
import { HeaderModule } from "../header/header.module";
import { CoursesService } from "../service/courses.service";
import { CourseComponent } from "./courses-page/course-list/course/course.component";
import { CourseBorderDirective } from "./courses-page/course-list/course/course-border.directive";
import { DurationPipe } from "./courses-page/course-list/course/duration.pipe";
import { CourseListComponent } from "./courses-page/course-list/course-list.component";
import { LoadMoreComponent } from "./courses-page/course-list/load-more/load-more.component";
import { CoursesPageComponent } from "./courses-page/courses-page.component";
import { FilterPipe } from "./courses-page/search/filter.pipe";
import { SearchComponent } from "./courses-page/search/search.component";

@NgModule({
    declarations: [
        SearchComponent,
        CourseListComponent,
        CourseComponent,
        LoadMoreComponent,
        DurationPipe,
        FilterPipe,
        CourseBorderDirective,
        CoursesPageComponent,
    ],
    imports: [
        CommonModule,
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
        FooterModule,
        HeaderModule,
    ],
    providers: [{ provide: TUI_SANITIZER, useClass: NgDompurifySanitizer }, CoursesService],
    exports: [CoursesPageComponent],
})
export class CoursesPageModule {}
