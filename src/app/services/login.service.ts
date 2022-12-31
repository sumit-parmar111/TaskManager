import { state } from '@angular/animations';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map, Observable } from 'rxjs';
import { LoginViewModel } from '../models/login-view-model';
import { SignUpViewModel } from '../models/sign-up-view-model';

@Injectable({
  providedIn: 'root'
})
export class LoginService  {
  private httpClient:HttpClient|null=null;
  constructor(private httpBckend:HttpBackend,private jwtHelperService:JwtHelperService) { }

  currentUserName:any=null;
  currentUserRole:any=null;

  public Login(loginViewModel:LoginViewModel):Observable<any>{
    this.httpClient=new HttpClient(this.httpBckend);
    return this.httpClient.post<any>("/authenticate",loginViewModel,{responseType:"json",observe:"response"})
    .pipe(map(response=>{
      if(response){
        this.currentUserName=response.body.userName;
        this.currentUserRole=response.body.role;
         sessionStorage['currentUser'] = JSON.stringify(response.body);
         sessionStorage['XSRFRequestToken']=response.headers.get("XSRF-REQUEST-TOKEN");
      }
      return response.body;
    }));
  }

  public Register(signUpViewModel:SignUpViewModel):Observable<any>{
    this.httpClient=new HttpClient(this.httpBckend);
    return this.httpClient.post<any>("/register",signUpViewModel,{responseType:"json",observe:"response"})
    .pipe(map(response=>{
      if(response){
        this.currentUserName=response.body.userName;
         sessionStorage['currentUser'] = JSON.stringify(response.body);
         sessionStorage['XSRFRequestToken']=response.headers.get("XSRF-REQUEST-TOKEN");
      }
      return response.body;
    }));
  }

  public getuserbyEmail(Email:any){
    this.httpClient=new HttpClient(this.httpBckend);
    return this.httpClient.get<any>("/api/getuserbyemail/"+Email,{responseType:"json"});
  }

  public LogOut(){
    sessionStorage.removeItem("currentUser");
    this.currentUserName=null;    
  }

  public isAuthenticated():boolean{
    var token=sessionStorage.getItem("currentUser") ? JSON.parse(sessionStorage.getItem("currentUser") as string).token:null;
    if(this.jwtHelperService.isTokenExpired()){
      return false;
    }
    else{
      return true;
    }
  }

  public detectIfAlreadyLoggedIn(){
    if(this.jwtHelperService.isTokenExpired()==false){
      var currentUser=JSON.parse(sessionStorage['currentUser'])    
      this.currentUserName=currentUser.userName;
      this.currentUserRole=currentUser.role;      
    }
  }
  public getAllEmployes():Observable<any>{
    this.httpClient=new HttpClient(this.httpBckend);
    return this.httpClient.get<any>("/api/getallemployees",{responseType:"json"})
  }
}

