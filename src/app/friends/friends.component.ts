import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit{
  users: any = []
  friends: any = []
  constructor(private _storageService: StorageService, private _userService: UserService){}
  ngOnInit(): void {
      let currentUser = JSON.parse(this._storageService.getSessionCurrentUser() || "{}")
      if(currentUser && Object.keys(currentUser).length > 0) {
        this._userService.getFriends().subscribe(data => {
          this.users = data
          this.users = this.users.filter((user: { userId: any; }) => user.userId == currentUser._id)
          for(let friendEntry of this.users){
            this._userService.getUserById(friendEntry.friendId).subscribe(data => {
              this.friends.push(data)
            })
          }
        })
      }
  }
}
