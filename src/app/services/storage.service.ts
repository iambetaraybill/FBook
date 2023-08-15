import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  saveSessionAuthToken(authToken: string) {
    sessionStorage.setItem('authorization', authToken)
  }

  getSessionAuthToken(){
    return sessionStorage.getItem('authorization');
  }

  saveSessionCurrentUser(user: User){
    sessionStorage.setItem("current_user", JSON.stringify(user));
  }

  getSessionCurrentUser(){
    return sessionStorage.getItem('current_user');
  }

  clearUser(){
    return sessionStorage.clear();
  }
}
