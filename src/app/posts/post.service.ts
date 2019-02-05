import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Post } from './post.model';
import { map } from 'rxjs/operators';


@Injectable({providedIn: 'root'})
export class PostsService{
    private posts: Post[] = [];
    private postsUpdated = new Subject<Post[]>();

    constructor(private http: HttpClient) {

    }

    getPosts(){
        //this.http.get<{message: string, posts: Post[]}>('http://localhost:3000/api/posts')
        this.http.get<{message: string, posts: any}>('http://localhost:3000/api/posts')
        .pipe(map((postData) => {
            return postData.posts.map(post => {
                return {
                    Content: post.Content,
                    header: post.header,
                    id: post._id
                }
            });
        }))
        .subscribe((posts) => {
            this.posts = posts;
            this.postsUpdated.next([...this.posts]);
        });
    }

    getPostUpdateListener(){
        return this.postsUpdated.asObservable();
    }

    addPost(header: string, Content: string){
        const post: Post = {id: null, header: header, Content: Content};
        this.http.post<{message: string, postId: string}>('http://localhost:3000/api/posts', post)
        .subscribe((responseData) => {
            const id = responseData.postId;
            post.id = id;
            console.log(responseData);
            this.posts.push(post);
            this.postsUpdated.next([...this.posts]);
        });        
    }

    deletePost(postId: string){
        this.http.delete('http://localhost:3000/api/posts/'+ postId)
        .subscribe(() => {            
            const updatedPosts = this.posts.filter(post => post.id !== postId);            
            this.posts = updatedPosts;
            this.postsUpdated.next([...this.posts]);
            console.log("Post Deleted");
        });
    }

    
    editPost(postId: string){
        /*
        this.http.edit('http://localhost:3000/api/posts/'+ postId)
        .subscribe(() => {
            const updatedPosts = this.posts.filter(post => post.id !== postId);
            this.posts = updatedPosts;
            this.postsUpdated.next([...this.posts]);
            console.log("Post Deleted");
        });
        */
    }
}