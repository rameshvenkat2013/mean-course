import {NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostListComponent } from './app/posts/post-list/post-list.component';
import { PostCreateComponent } from './app/posts/post-create/post-create.component';
import { LoginComponent } from './app/auth/sign_in/login.component';
import { SignupComponent } from './app/auth/sign_up/signup.component';

const routes: Routes = [
    {
        path: '',
        component: PostListComponent
    },
    {
        path: 'create',
        component: PostCreateComponent
    },
    {
        path: 'edit/:postId',
        component: PostCreateComponent
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
    exports: [RouterModule]
})

export class AppRoutingModule {}