import {NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostListComponent } from './app/posts/post-list/post-list.component';
import { PostCreateComponent } from './app/posts/post-create/post-create.component';
import { LoginComponent } from './app/auth/sign_in/login.component';
import { SignupComponent } from './app/auth/sign_up/signup.component';
import { AuthGuard } from './app/auth/auth.guard';

const routes: Routes = [
    {
        path: '',
        component: PostListComponent
    },
    {
        path: 'create',
        component: PostCreateComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'edit/:postId',
        component: PostCreateComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'signup',
        component: SignupComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [AuthGuard]
})

export class AppRoutingModule {}