import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-network',
  templateUrl: './network.component.html',
  styleUrls: ['./network.component.css']
})
export class NetworkComponent implements OnInit {

  users: any = []
  currentUser: any = []
  success: boolean = false;
  successMessage: string = ""
  constructor(private _userService: UserService, private _storageService: StorageService){}

  ngOnInit(): void {
    this._userService.getAllUsers().subscribe(data => this.users = data)
  }

  sendFriendRequest(friendId: string){
    console.log(friendId)
    this.currentUser = JSON.parse(this._storageService.getSessionCurrentUser() || "{}")
    if(this.currentUser && Object.keys(this.currentUser).length > 0){
      let requestObj = {
        userId: this.currentUser._id,
        friendId: friendId
      }
      this._userService.createFriendRequest(requestObj).subscribe(data => {
        if(data){
          this.success = true;
          this.successMessage = data.message;
        }
      })
    }
  }

}
