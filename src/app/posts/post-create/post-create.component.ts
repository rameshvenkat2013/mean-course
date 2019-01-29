import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Post } from '../post.model';
import { PostsService } from '../post.service';

@Component({
    selector:'app-post-create',
    templateUrl:'./post-create.component.html',
    styleUrls: ['./post-create.component.css']
})

export class PostCreateComponent {
    UserPost = '';
    UserHeading = '';

    constructor(public postsService: PostsService){
    }
    
    onPOSTAdd(form: NgForm) {
        if(form.invalid){
            return;
        }
         this.postsService.addPost(form.value.heading,form.value.content);
         form.resetForm();
     }
  }
  