import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const APIROOTURL = "http://3.17.216.66:3000/";
const APIURL = APIROOTURL + "users/";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private _http: HttpClient) { }

  findUserByEmail(email: string): Observable<any> {
    return this._http.post(`${APIURL}finduserbyemail`, {
      email: email
    }, httpOptions)

  }

  updateUser(id: string, user: any): Observable<any> {
    return this._http.put(`${APIURL}${id}`, {
      user
    }, httpOptions)
  }

  getUserPhoto(photoId: string): Observable<any> {
    return this._http.get(APIROOTURL + "files/" + photoId, {responseType: 'blob' as "json"})
  }

  getAllUsers(){
    return this._http.get(APIURL)
  }

  getFriends(){
    return this._http.get(APIROOTURL + "friends")
  }

  createPost(detailObj: any): Observable<any>{
    return this._http.post(APIROOTURL + 'posts/createpost', {
      post: detailObj.post,
      userId: detailObj.userId,
      userName: detailObj.userName,
      userPhotoId: detailObj.userPhotoId,
      postImageId: "",
      isActive: true,
      isAdmin: false,
      profession: 'Developer'
    }, httpOptions)
  }

  getUserPost(userId: string): Observable<any>{
    return this._http.post(APIROOTURL + "posts/findpostbyuserid", {
      id: userId
    }, httpOptions)
  }

  createFriendRequest(requestObj: any): Observable<any>{
    return this._http.post(APIROOTURL + "friends/createrequest", {
      userId: requestObj.userId,
      friendId: requestObj.friendId,
      status: "Request Pending"
    }, httpOptions)
  }

  getUserById(userId: string): Observable<any>{
    return this._http.get(APIURL + userId)
  }
}
