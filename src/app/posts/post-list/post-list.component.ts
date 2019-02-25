import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Post } from '../post.model';
import { PostsService } from '../post.service';
import { PageEvent } from '@angular/material';

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
    totalPosts = 0;
    postsPerPage = 3;
    currentPage = 1;
    pageSizeOptions = [1,2,5,10];

    private postsSub: Subscription;

    constructor(public postsService: PostsService) {}

    ngOnInit(){
        this.postsService.getPosts(this.postsPerPage,this.currentPage);
        this.isLoading = true;
        this.postsSub = this.postsService.getPostUpdateListener().subscribe((postData: {posts: Post[], postCount: number}) => {
            this.isLoading = false;
            this.totalPosts = postData.postCount;
            this.posts = postData.posts;
        });
    }

    onChangePage(pageData: PageEvent){
        this.isLoading = true;
        this.currentPage = pageData.pageIndex + 1;
        this.postsPerPage = pageData.pageSize;
        this.postsService.getPosts(this.postsPerPage,this.currentPage);
    }

    onDelete(postId: string){
        this.isLoading = true;
        this.postsService.deletePost(postId).subscribe(() =>{
            this.postsService.getPosts(this.postsPerPage, this.currentPage);
        });
    }

    ngOnDestroy(){
        this.postsSub.unsubscribe();
    }
}