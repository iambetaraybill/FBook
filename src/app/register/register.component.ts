import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  submitted = false;
  errorResponse = false;
  errorMessage = '';

  registerForm = new FormGroup({
    firstName: new FormControl("", Validators.required),
    lastName: new FormControl("", Validators.required),
    email: new FormControl("", [Validators.required, Validators.email]),
    dob: new FormControl(""),
    gender: new FormControl(""),
    password: new FormControl("", Validators.required)
  })
  
  constructor(private authService: AuthService){}

  get f() { return this.registerForm.controls}
  
  onSubmit(){
    const firstName = this.registerForm.value.firstName!
    const lastName = this.registerForm.value.lastName!
    const email = this.registerForm.value.email!
    const dob = this.registerForm.value.dob!
    const gender = this.registerForm.value.gender!
    const password = this.registerForm.value.password!
    this.authService.register(firstName, lastName, email, dob, gender, password).subscribe({next: data => {
      console.log(data)
    }, error: err => console.log(err.error.message)
  })
  }

}
