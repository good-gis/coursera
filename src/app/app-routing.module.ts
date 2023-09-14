import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AddCoursePageComponent } from "./add-course-page/add-course-page.component";
import { authGuard } from "./auth.guard";
import { CoursesPageComponent } from "./courses-page/courses-page.component";
import { EditCoursePageComponent } from "./edit-course-page/edit-course-page.component";
import { LoginPageComponent } from "./login-page/login-page.component";
import { NotFoundComponent } from "./not-found/not-found.component";

const routes: Routes = [
    { path: "", redirectTo: "/login", pathMatch: "full" },
    { path: "courses", component: CoursesPageComponent, canActivate: [authGuard] },
    { path: "courses/new", component: AddCoursePageComponent, canActivate: [authGuard] },
    { path: "courses/:id", component: EditCoursePageComponent, canActivate: [authGuard] },
    { path: "login", component: LoginPageComponent },
    { path: "404", component: NotFoundComponent },
    { path: "**", redirectTo: "404" },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
