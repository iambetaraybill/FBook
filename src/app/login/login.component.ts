import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../interfaces/user';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  user!: User;
  submitted = false;
  errorResponse = false;
  errorMessage = '';

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  })

  constructor(private authService: AuthService, private _storageService: StorageService, private router: Router){}

  get f() { return this.loginForm.controls}

  login() {
    this.submitted = true
    
    const email: string =  this.loginForm.value.email!;
    const password: string =  this.loginForm.value.password!;
    this.authService.authenticate(email, password).subscribe({ 
      next: (data: any) => {
        this.user = {
          isAdmin: data.isAdmin,
          isActive: data.isActive,
          "_id": data["_id"],
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          dob: data.dob,
          gender: data.gender,
          photoId: data.photoId,
          createdDate: data.createdDate,
          "_v": data["_v"],
          token: data.token
        }
        this._storageService.saveSessionAuthToken(this.user.token);
        this._storageService.saveSessionCurrentUser(this.user)
        if(this.user.token){
          alert("Login successful!");
          this.router.navigate(['posts'])
        }
      }, error: err => {
        this.errorResponse = true;
        this.errorMessage = err.error.message;
      }
      })
  }

}
