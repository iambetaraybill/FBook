import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, first, last, Observable, throwError } from 'rxjs';
import { User } from '../interfaces/user';
import { StorageService } from './storage.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const BASEURL = "http://3.17.216.66:3000/users/"

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private _http: HttpClient, private _storageService: StorageService) { }

 

  authenticate(email: string, password: string): Observable<any> {
    return this._http.post<any>(BASEURL + "authenticate", {
      email: email,
      password: password
    }, httpOptions)
  }
  register(firstName: string, lastName: string, email: string, dob: string, gender: string, password: string): Observable<any> {
    return this._http.post(BASEURL + "register",{
      firstName: firstName,
      lastName: lastName,
      email: email,
      dob: dob,
      gender: gender,
      password: password
    }, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  signOut() {
    return this._storageService.clearUser();
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      
      console.error('An error occurred:', error.error);
    } else {
      
      
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
