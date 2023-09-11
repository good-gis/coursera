import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginPageComponent} from "../login-page/login-page.component";
import {CourseListComponent} from "../courses-page/course-list/course-list.component";
import {AddCoursePageComponent} from "../add-course-page/add-course-page.component";
import {EditCoursePageComponent} from "../edit-course-page/edit-course-page.component";

const routes: Routes = [
    { path: '', redirectTo: '/courses', pathMatch: 'full' },
    { path: 'courses', component: CourseListComponent },
    { path: 'courses/new', component: AddCoursePageComponent },
    { path: 'courses/:id', component: EditCoursePageComponent },
    { path: 'login', component: LoginPageComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
