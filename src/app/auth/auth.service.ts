import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Router } from "@angular/router";
import { Subject } from "rxjs";

import { AuthData } from "./auth-data.model";
import { UserData } from "./user-data.model";
import { environment } from "../../environments/environment";

@Injectable({ providedIn: "root" })
export class AuthService {
  private isAuthenticated = false;
  private token: string;

  private tokenTimer: any;
  private tokenRenewer: any;

  public authStatus = new Subject<boolean>();

  private authData: object;

  private apiUrl = environment.apiUrl + "/" + "user";

  private userArray: string[] = [];
  constructor(private http: HttpClient, private router: Router) {}



  getUserName(){
    return localStorage.getItem("userName");
  }



  getToken() {
    this.token = localStorage.getItem("token");
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  checkUserNameAndEmail(userName:string, email:string){
    const params = new HttpParams()
      .set("userName", userName)
      .set("email", email)

    return this.http.get<{message:string}>(
      this.apiUrl + "/checkUserNameAndEmail", {params: params}
    );
  }

  createUser(userData: UserData){
    return this.http.post<{message:string}>
    (this.apiUrl + "/signup", userData)
  }

  login(identity: string, password: string) {
    const authData = {
      identity: identity,
      password: password,
    };

    this.http
      .post<{token: string; expiresIn: number; userName: string ; userArray_past: string[]}>(
        this.apiUrl + "/login",
        authData
      )
      .subscribe(
        response => {

          this.userArray = response.userArray_past;
          console.log("成了吗");
          for (let i = 0; i < this.userArray.length; i++) {
            console.log(this.userArray[i]);
          }




          const token = response.token;
          this.token = token;
          this.setUserName(response.userName);

          const expiresInDuration = response.expiresIn;
          //this.setAuthTimer(expiresInDuration);
          this.autoRenewToken(expiresInDuration);

          this.isAuthenticated = true;

          this.authStatus.next(true);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);

          this.saveAuthData(token, expirationDate);

        },
        // handle the error in the second argument of subscribe
        error => {
          this.authStatus.next(false);
        });
  }

  getName() {

    const userData = {

      userArray_past : this.userArray
    };

    this.http
      .post<{ userArray_past: string[]; token: string; expiresIn: number; userName: string }>(
        this.apiUrl ,
        userData
      )
      .subscribe(
        response => {
          this.userArray = response.userArray_past;
          console.log("成了吗");
          console.log(this.userArray[0]);
        },
        // handle the error in the second argument of subscribe

        error => {
          this.authStatus.next(false);
        });

  }


  loginToJoinEntity(identity: string, password:string,
                    entityType:string, entityName:string, entityId:string){

    const authData = {
      identity: identity,
      password: password,
      entityType: entityType,
      entityId:entityId
    };

    this.http
      .post<{token: string; expiresIn: number; userName:string }>(
        this.apiUrl + "/loginToJoinEntity",
        authData
      )
      .subscribe(
        response => {

          const token = response.token;
          this.token = token;
          this.setUserName(response.userName);
          const expiresInDuration = response.expiresIn;
          //this.setAuthTimer(expiresInDuration);
          this.autoRenewToken(expiresInDuration);

          this.isAuthenticated = true;

          this.authStatus.next(true);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
          this.saveAuthData(token, expirationDate);

        },
        // handle the error in the second argument of subscribe
        error => {
          console.log(error);
          this.authStatus.next(false);
        });
  }

  setUserName(userName:string){
    localStorage.setItem("userName", userName);
  }

  //fetch userInfo to update
  fetchUserInfo(){
    const params = new HttpParams()
      .set("userName", this.getUserName())
    return this.http.get<{
      firstName:string,
      lastName:string,
      userName:string,
      email:string,
      affiliation:string}>(
      this.apiUrl + "/fetchUserInfo", { params }
    );
  }

  updateOneUser(updatedInfo: any){
    return this.http.put(this.apiUrl, updatedInfo);
  }

  // authenticate the user automatically up on the start of the app
  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      //this.setAuthTimer(expiresIn / 1000);
      this.autoRenewToken(expiresIn / 1000)
      this.authStatus.next(true);
    }
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatus.next(false);

    clearTimeout(this.tokenTimer);
    clearInterval(this.tokenRenewer);

    this.clearAuthData();
    this.router.navigate(["/"]);
  }

  checkUserExist(userName:string){
    let params = new HttpParams()
      .set("userName", userName);
    return this.http.get(this.apiUrl, { params });
  }

  passwordReset(userEmail){
    let params = new HttpParams()
      .set("email", userEmail);
    return this.http.get<{message:string}>(
      this.apiUrl + "/passwordReset/forgotPassword", { params });
  }

  updatePassword(currentPassword:string, newPassword:string){
    const passData = {
      "userName": this.getUserName(),
      "currentPassword": currentPassword,
      "newPassword": newPassword,
    };
    return this.http.put<{message:string}>(
      this.apiUrl + "/updatePassword", { passData });
  }

  private setAuthTimer(duration: number) {
    console.log("Setting timer: " + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }


  private autoRenewToken(duration: number){
    console.log("Renewing token:" + duration);
    this.tokenRenewer = setInterval(()=> {
      //run every 58 mins
      if(this.isAuthenticated){
        this.renewToken();
      }
    }, (duration - 120) * 1000 );
  }

  private renewToken(){
    this.http.get<{token:string, expiresIn:number}>
    (this.apiUrl + "/renewToken").subscribe(
      res => {
        const token = res.token;
        this.token = token;
        const expiresInDuration = res.expiresIn; // in sec
        // this.setAuthTimer(expiresInDuration);
        this.isAuthenticated = true;
        this.authStatus.next(true);
        const now = new Date();
        const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
        this.saveAuthData(token, expirationDate);




      }
    );
  }


  private saveAuthData(token: string, expirationDate: Date) {
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
  }

  private clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("userName");
  }

  private getAuthData() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate)
    }
  }





}
