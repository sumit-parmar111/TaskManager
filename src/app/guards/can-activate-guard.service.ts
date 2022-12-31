import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class CanActivateGuardService implements CanActivate {

  constructor(private loginService:LoginService,private router:Router,private jwtHelperService:JwtHelperService) { 

  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean{    
    var token=sessionStorage.getItem("currentUser") ? JSON.parse(sessionStorage.getItem("currentUser") as string).token:null;
    if(this.jwtHelperService.decodeToken(token).role == route.data['expectedRole'] && this.loginService.isAuthenticated()){ 
     
      return true;
    }
    else{
      window.alert("You don't have permission to view this page");
      this.router.navigate(["login"]);
      return false;
    } 
    
  }
}
