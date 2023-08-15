import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  submitted: boolean = false;
  postObject: any = {};
  currentUser: any = {};
  posts: any = [];
  success: boolean = false;
  successMessage: string = "";
  constructor(private _userService: UserService, private _storageService: StorageService, private router: Router){}

  postForm = new FormGroup({
    post: new FormControl('', Validators.required)
  })

  ngOnInit(): void {
    this.currentUser = JSON.parse(this._storageService.getSessionCurrentUser() || "{}")
    this._userService.getUserPost(this.currentUser._id).subscribe(data => {
      this.posts = data
    })
    if(Object.keys(this.currentUser).length == 0){
      this.router.navigate(['/login']);
    }
  }

  public get f() { return this.postForm.controls}

  onSubmitPost() {
    this.submitted = true
    this.currentUser = JSON.parse(this._storageService.getSessionCurrentUser() || "{}")
    if(this.currentUser && Object.keys(this.currentUser).length > 0){
      this.postObject = {
        post: this.postForm.value.post!,
        userId: this.currentUser._id,
        userName: this.currentUser.firstName + this.currentUser.lastName,
        userPhotoId: this.currentUser.photoId
      }
    }
    this._userService.createPost(this.postObject).subscribe( data => {
      if(data){
        this.success = true;
        this.successMessage = data.message;
      }
    })
  }



}
