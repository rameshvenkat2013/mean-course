import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { PostsService } from '../post.service';
import { Post } from '../post.model';

@Component({
    selector:'app-post-create',
    templateUrl:'./post-create.component.html',
    styleUrls: ['./post-create.component.css']
})

export class PostCreateComponent implements OnInit{
    UserPost = '';
    UserHeading = '';
    private mode = 'create';
    private postId: string;
    post: Post;
    isLoading = false;

    constructor(public postsService: PostsService, public route:ActivatedRoute){
    }

    ngOnInit() {
        this.route.paramMap.subscribe((paramMap: ParamMap) => {
            if(paramMap.has('postId')){
                this.mode = 'edit';
                this.postId = paramMap.get('postId');
                this.isLoading = true;
                this.postsService.getPost(this.postId).subscribe(postData => {
                    this.isLoading = false;
                    this.post = {id: postData._id,                                 
                                header:postData.header,
                                Content:postData.Content}
                });
            }else{
                this.isLoading = false;
                this.mode = 'create';
                this.postId = null;
            }
        });
    }
    
    onSavePost(form: NgForm) {
        if(form.invalid){
            return;
        }

        this.isLoading = true;
        if(this.mode == 'create'){            
            this.postsService.addPost(form.value.heading,form.value.content);
        }else if(this.mode == 'edit'){            
            this.postsService.updatePost(form.value.heading,form.value.content,this.postId);
        }
         
         form.resetForm();
     }
  }
  