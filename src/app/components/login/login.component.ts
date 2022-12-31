import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginViewModel } from '../../models/login-view-model';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginViewModel:LoginViewModel=new LoginViewModel();
  loginError:string="";

  constructor(private loginService:LoginService,private router:Router){

  }

  ngOnInit(){
    
  }

  onLoginClick(event:any){
    this.loginService.Login(this.loginViewModel).subscribe({
      next: (response) => {
        if(this.loginService.currentUserRole=="Admin"){
          this.router.navigate(["/admin", "dashboard"]);
        }
        else{
          this.router.navigate(["/employee","tasks"]);
        }
        
      },
      error: (error) => {
          this.loginError="Invalid Username And Password";
          console.log(this.loginError);
      }
    }); 
    
  }

}
