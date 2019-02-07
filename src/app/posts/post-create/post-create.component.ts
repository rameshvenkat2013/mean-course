import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { PostsService } from '../post.service';
import { Post } from '../post.model';
import { mimeType } from './mime-type.validator';

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
    form: FormGroup;
    imagePreview;

    constructor(public postsService: PostsService, public route:ActivatedRoute){
    }

    ngOnInit() {
        this.form = new FormGroup({
            'header' : new FormControl(null,{
                validators: [Validators.required, Validators.minLength(3)]
            }),
            'content' : new FormControl(null,{
                validators: [Validators.required]
            }),
            'image' : new FormControl(null, {validators: [Validators.required], asyncValidators: [mimeType]})
        });
        this.route.paramMap.subscribe((paramMap: ParamMap) => {
            if(paramMap.has('postId')){
                this.mode = 'edit';
                this.postId = paramMap.get('postId');
                this.isLoading = true;
                this.postsService.getPost(this.postId).subscribe(postData => {
                    this.isLoading = false;
                    this.post = {id: postData._id,                                 
                                header:postData.header,
                                Content:postData.Content};
                    this.form.setValue({
                            'header':this.post.header, 
                            'content': this.post.Content
                        });
                });
            }else{
                this.isLoading = false;
                this.mode = 'create';
                this.postId = null;
            }
        });
    }

    onImagePicked(event: Event){
        const file = (event.target as HTMLInputElement).files[0];
        this.form.patchValue({image: file});
        this.form.get('image').updateValueAndValidity();
        const reader = new FileReader();
        reader.onload= () => {
            this.imagePreview = reader.result;
        };
        reader.readAsDataURL(file);        
    }
    
    onSavePost() {
        if(this.form.invalid){
            return;
        }

        this.isLoading = true;
        if(this.mode == 'create'){
            this.postsService.addPost(
                this.form.value.header,
                this.form.value.content,
                this.form.value.image
            );
        }else if(this.mode == 'edit'){
            this.postsService.updatePost(
                this.form.value.header,
                this.form.value.content,
                this.postId);
        }
         
         this.form.reset();
     }
  }
  