import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  submitted: boolean = false;
  forgotPasswordForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required)
  })
  constructor(private _userService: UserService, private router: Router){}

  public get f() {return this.forgotPasswordForm.controls}

  resetPassword() {
    this.submitted = true;
    let userId: string = "0"
    const email = this.forgotPasswordForm.value.email
    const password = this.forgotPasswordForm.value.password
    if(email){
      this._userService.findUserByEmail(email).subscribe( data => {
        userId = data[0]['_id'];
        this._userService.updateUser(userId, {password: password}).subscribe( data => {
          alert("Password Reset successful!");
          this.router.navigate(['posts'])
        });
      });
    }

  }
}
