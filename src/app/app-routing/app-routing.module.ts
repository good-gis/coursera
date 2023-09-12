import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginPageComponent} from "../login-page/login-page.component";
import {AddCoursePageComponent} from "../add-course-page/add-course-page.component";
import {EditCoursePageComponent} from "../edit-course-page/edit-course-page.component";
import {CoursesPageComponent} from "../courses-page/courses-page.component";
import {NotFoundComponent} from "../not-found/not-found.component";

const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'courses', component: CoursesPageComponent },
    { path: 'courses/new', component: AddCoursePageComponent },
    { path: 'courses/:id', component: EditCoursePageComponent },
    { path: 'login', component: LoginPageComponent },
    { path: '404', component: NotFoundComponent },
    { path: '**', redirectTo: '404' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
