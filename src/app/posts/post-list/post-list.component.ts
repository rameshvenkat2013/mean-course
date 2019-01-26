import { Component, Input } from '@angular/core';

@Component({
    selector:'app-post-list',
    templateUrl:'./post-list.component.html',
    styleUrls: ['./post-list.component.css']
})

export class PostListComponent {
    @Input() posts = [
        /*{ header : 'First Post', Content : 'some dummy first content' },
        { header : 'Second Post', Content : 'some dummy second content' },
        { header : 'Third Post', Content : 'some dummy third content' }*/
    ];    
  }
  