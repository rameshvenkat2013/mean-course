import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector:'app-post-create',
    templateUrl:'./post-create.component.html',
    styleUrls: ['./post-create.component.css']
})

export class PostCreateComponent {
    UserPost = '';
    UserHeading = '';
    @Output() postCreated = new EventEmitter();
    
    onPOSTAdd() {
        const post = { 
            header: this.UserHeading,
            Content: this.UserPost
         };
         this.postCreated.emit(post);
     }
  }
  