import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JwtUnAuthorizedInterceptorService } from './interceptors/jwt-un-authorized-interceptor.service';
import { JwtModule } from '@auth0/angular-jwt';
import { DatePipe } from '@angular/common';
import { RepeaterDirective } from './directives/repeater.directive';
import { EmployeeModule } from './employee/employee.module';
import { AlertDirective } from './directives/alert.directive';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { JwtInterceptorService } from './interceptors/jwt-interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { AboutComponent } from './admin/components/about/about.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    LoginComponent,
    SignUpComponent,
    AlertDirective,
    RepeaterDirective,
    
    
    
  ],
  imports: [    
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    AppRoutingModule,
    //AdminModule,// lazy loading.
    EmployeeModule,
    JwtModule.forRoot({
      config:{
        tokenGetter:()=>{
          return (sessionStorage.getItem("currentUser")?
          JSON.parse(sessionStorage.getItem("currentUser")as string).token:null)
        }
      }
    })    
  ], 
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass:JwtInterceptorService,
      multi:true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass:JwtUnAuthorizedInterceptorService,
      multi:true
    },
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
