import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterLink } from "@angular/router";
import { TuiAlertModule, TuiButtonModule, TuiDialogModule, TuiLinkModule, TuiRootModule, TuiSvgModule, TuiTextfieldControllerModule } from "@taiga-ui/core";
import { TuiBadgeModule, TuiInputModule, TuiLineClampModule, TuiMarkerIconModule } from "@taiga-ui/kit";

import { FooterModule } from "../footer/footer.module";
import { HeaderModule } from "../header/header.module";
import { CoursesService } from "../service/courses.service";
import { CourseComponent } from "./course-list/course/course.component";
import { CourseBorderDirective } from "./course-list/course/course-border.directive";
import { DurationPipe } from "./course-list/course/duration.pipe";
import { CourseListComponent } from "./course-list/course-list.component";
import { LoadMoreComponent } from "./course-list/load-more/load-more.component";
import { CoursesPageComponent } from "./courses-page.component";
import { FilterPipe } from "./search/filter.pipe";
import { SearchComponent } from "./search/search.component";
import {TuiDestroyService} from "@taiga-ui/cdk";

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
    providers: [CoursesService, TuiDestroyService],
    exports: [CoursesPageComponent],
})
export class CoursesPageModule {}
