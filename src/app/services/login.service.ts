import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { baseUrl } from './helper';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public loginStatusSubjec = new Subject<boolean>();

  constructor(private http: HttpClient) { }

  public generateToken = (loginData:any) => {
    return this.http.post(`${baseUrl}/generate-token`,loginData);

  }
  //Start session and save token in localstorage
  public loginUser(token:any){
    localStorage.setItem('token', token);
  }
  public isLoggedIn(){
    let tokenStr = localStorage.getItem('token');
    if(tokenStr == undefined || tokenStr == '' || tokenStr == null){
      return false;
    }else{
      return true;
    }
  }

  public closeSession(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }
  public getToken(){
    return localStorage.getItem('token')
  }
  public setUser(user:any){
    localStorage.setItem('user',JSON.stringify(user));
  }
  public getUser(){
    let userStr = localStorage.getItem('user');
    if(userStr != null){
      return JSON.parse(userStr);
    }else{
      this.closeSession();
      return null;
    }
  }

  public getUserRole(){
    let user = this.getUser();
    return user.authorities[0].authority
  }
  public getCurrentUser(){
    return this.http.get(`${baseUrl}/actual-usuario`);
  }
}
