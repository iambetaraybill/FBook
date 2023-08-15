import { Component, OnInit } from '@angular/core';
import { UserService } from "../services/user.service";

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.css']
})
export class AdminUserComponent implements OnInit {

  users:any = []
  constructor(private _userService: UserService){}
  ngOnInit(): void {
    this._userService.getAllUsers().subscribe(data => {
      this.users = data
      console.log(this.users)
    })
  }

}
