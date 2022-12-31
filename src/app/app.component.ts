import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { LoginService } from './services/login.service';
import { fadeAnimation, keyFrameAnimation, slideLeftOrRightAnimation, slideUpAnimation, zoomLeftAnimation, zoomUpAnimation } from './my-animations';
import { RouterLoggerService } from './services/router-logger.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations:[/*fadeAnimationslideUpAnimationzoomUpAnimationzoomLeftAnimationslideLeftOrRightAnimationkeyFrameAnimation*/fadeAnimation]
})
export class AppComponent implements OnInit
{
   
  constructor(public loginService:LoginService,private domSanatizer:DomSanitizer,private routerLoggerService:RouterLoggerService,private router:Router){

  }


  ngOnInit() {
    this.loginService.detectIfAlreadyLoggedIn();
    this.router.events.subscribe((event)=>{
      if(event instanceof NavigationEnd){
        let userName=(this.loginService.currentUserName)?
        this.loginService.currentUserName:"anonymous";

        let logMsg=new Date().toLocaleString()+":"+userName+"navigates to"+event.url;
        this.routerLoggerService.log(logMsg).subscribe();
      }
    });
    
  }

  getState(outlet){
    return outlet.isActivated?
    outlet.activatedRoute.snapshot.url[0].path
    &&outlet.activatedRouteData["linkIndex"]:"none";
  }
}

