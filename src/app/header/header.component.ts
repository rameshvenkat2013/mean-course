import {Component} from '@angular/core';

@Component({
    selector:'app-header',
    templateUrl:'./header.component.html',
    styleUrls:['./header.component.css']
})

export class HeaderComponent {
    UserPost = '';
    newPost = 'No Post Yet';
    onPOSTAdd() { this.newPost = this.UserPost }
  }
  