import { NgModule } from "@angular/core";
import { NoPreloading, PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { AboutComponent } from "./admin/components/about/about.component";
import { LoginComponent } from "./components/login/login.component";
import { SignUpComponent } from "./components/sign-up/sign-up.component";
import { CanDeactivateGuardService } from "./guards/can-deactivate-guard.service";


const routes: Routes = [
  {path:"",redirectTo:"login",pathMatch:"full"},
  {path:"login",component:LoginComponent,data:{linkIndex:3}},
  {path:"signup",component:SignUpComponent,canDeactivate:[CanDeactivateGuardService],data:{linkIndex:2}},
  {path:"about",component:AboutComponent,data:{linkIndex:1}},
  {path:"admin",loadChildren:()=>import("./admin/admin.module").then(m=>m.AdminModule)},
  {path:"employee",loadChildren:()=>import("./employee/employee.module").then(m=>m.EmployeeModule)}
  // {path:"admin",canActivate:[CanActivateGuardService],data:{
  //   expectedRole:"Admin"},children:[
  //   {path:"dashboard",component:DashboardComponent},    
  //   {path:"projects",component:ProjectsComponent},
  //   {path:"projects/view/:projectid",component:ProjectDetailsComponent},
  // ]},  
    // {path:"employee",canActivate:[CanActivateGuardService],data:{
    //   expectedRole:"Employee"},children:[
    //     {path:"tasks",component:TasksComponent}
    //   ]},
      
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true/*,enableTracing:true*/,preloadingStrategy:PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
