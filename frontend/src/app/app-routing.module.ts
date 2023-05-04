import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsComponent } from "./posts/posts.component"
import { NewPostComponent } from "./new-post/new-post.component"
import { UsersComponent } from "./users/users.component"
import { LoginComponent } from "./login/login.component"
import { RegisterComponent } from "./register/register.component"
import { PostsAdminComponent } from "./posts-admin/posts-admin.component"
import { PostEditComponent } from "./post-edit/post-edit.component"
import { AllPostsComponent } from "./all-posts/all-posts.component"
import { LoginGuard } from "./login.guard"
import { AdminGuard } from "./admin.guard"


const routes: Routes = [
	{ path: "home", component: AllPostsComponent},
	{ path: "users", component: UsersComponent },
	{ path: "posts/:id", component: PostsComponent },
	{ path: "new-post", component: NewPostComponent, canActivate: [LoginGuard] },
	{ path: "login", component: LoginComponent },
	{ path: "register", component: RegisterComponent },
	{ path: "admin", component: PostsAdminComponent, canActivate: [AdminGuard] },
	{ path: "edit/:user/:i", component: PostEditComponent, canActivate: [AdminGuard] },
	{ path: "**", redirectTo: "/home" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
