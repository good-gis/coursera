import { NgDompurifySanitizer } from "@tinkoff/ng-dompurify";
import {
    TuiRootModule,
    TuiDialogModule,
    TuiAlertModule,
    TUI_SANITIZER,
    TuiLinkModule,
    TuiSvgModule
} from "@taiga-ui/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CourseComponent } from './home/course-list/course/course.component';
import { CourseListComponent } from './home/course-list/course-list.component';
import { LoadMoreComponent } from './home/course-list/load-more/load-more.component';
import { FooterComponent } from './home/footer/footer.component';
import { HeaderComponent } from './home/header/header.component';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './home/search/search.component';
import {RouterLink} from "@angular/router";

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
  ],
    imports: [BrowserModule, BrowserAnimationsModule, TuiRootModule, TuiDialogModule, TuiAlertModule, TuiLinkModule, RouterLink, TuiSvgModule],
  providers: [{provide: TUI_SANITIZER, useClass: NgDompurifySanitizer}],
  bootstrap: [AppComponent],
})
export class AppModule {}
