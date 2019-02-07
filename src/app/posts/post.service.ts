import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Post } from './post.model';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable({providedIn: 'root'})
export class PostsService{
    private posts: Post[] = [];
    private postsUpdated = new Subject<Post[]>();

    constructor(private http: HttpClient, private router: Router) {

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

    addPost(header: string, Content: string, image: File){
        //const post: Post = {id: null, header: header, Content: Content};
        const postData = new FormData();
        postData.append('header',header);
        postData.append('content',Content);
        postData.append('image',image, header);
        
        this.http.post
        <{message: string, postId: string}>('http://localhost:3000/api/posts', postData)
        .subscribe(response => {
            const post: Post = {id: response.postId, header: header, Content: Content}
            // console.log('inside add subscribe');
            // const id = response.postId;
            // post.id = id;
            console.log(response);
            this.posts.push(post);
            this.postsUpdated.next([...this.posts]);
            this.router.navigate(['/']);
        });
    }

    updatePost(header: string, Content: string, id: string){
        const post: Post = {id: id, header: header, Content: Content};
        this.http.put<{message: string, postId: string}>('http://localhost:3000/api/posts/'+id, post)
        .subscribe(response => {
            console.log('inside update subscribe');
            const updatedPosts = [...this.posts];
            const oldPostIndex = updatedPosts.findIndex(p => p.id === post.id);
            updatedPosts[oldPostIndex] = post;
            this.posts = updatedPosts;
            this.postsUpdated.next([...this.posts]);
            this.router.navigate(['/']);
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

    getPost(id: string){
        return this.http.get<{_id: string, Content: string, header: string}>('http://localhost:3000/api/posts/'+ id);
        //return {...this.posts.find(p => p.id === id)};
    }
}