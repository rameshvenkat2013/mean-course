import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Post } from '../post.model';
import { PostsService } from '../post.service';

@Component({
    selector:'app-post-list',
    templateUrl:'./post-list.component.html',
    styleUrls: ['./post-list.component.css']
})

export class PostListComponent implements OnInit, OnDestroy {
    posts: Post[] = [
        /*{ header : 'First Post', Content : 'some dummy first content' },
        { header : 'Second Post', Content : 'some dummy second content' },
        { header : 'Third Post', Content : 'some dummy third content' }*/
    ];
    isLoading = false;

    private postsSub: Subscription;

    constructor(public postsService: PostsService) {}

    ngOnInit(){
        this.postsService.getPosts();
        this.isLoading = true;
        this.postsSub = this.postsService.getPostUpdateListener().subscribe((posts: Post[]) => {
            this.isLoading = false;
            this.posts = posts;
        });
    }

    onDelete(postId: string){        
        this.postsService.deletePost(postId);
    }
    
    ngOnDestroy(){
        this.postsSub.unsubscribe();
    }
}
  