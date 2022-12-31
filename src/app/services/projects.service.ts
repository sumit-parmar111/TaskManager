import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, map, Observable, Observer, Subject } from 'rxjs';
import { Project } from '../models/project';


@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  public MySubject:BehaviorSubject<boolean>;
  //private MyObservers:Observer<boolean>[]=[];
  constructor(private httpClient:HttpClient) 
  { 
   this.MySubject= new BehaviorSubject<boolean>(false);
  //  ((observer:Observer<Boolean>)=>{
  // this.MyObservers.push(observer);
  //  });
   }
   //hideDetails:boolean=false;
  
  toggleDetails(){
    // this.hideDetails=!this.hideDetails;
    // // for(let i=0;i<this.MyObservers.length;i++)
    // // {
    // //   this.MyObservers[i].next(this.hideDetails);
    // // }.
    // this.MySubject.next(this.hideDetails);
    this.MySubject.next(!this.MySubject.value);

  }
  getAllProjects():Observable<Project[]>{
    
    // var currentUser={token:""};
    // var headers=new HttpHeaders();
    // headers=headers.set("Authorization","Bearer ");
    // if(sessionStorage['currentUser']!=null)
    // {
    //   currentUser=JSON.parse(sessionStorage['currentUser']);
    //   headers=headers.set("Authorization","Bearer "+currentUser.token);
    // }

    return this.httpClient.get<Project[]>("/api/projects",{responseType:"json"})
    .pipe(map(
      (data:Project[])=>{
        for(let i=0;i<data.length;i++){
          //data[i].teamSize=data[i].teamSize*100
        }
        return data;
      }
    ))
  }
  insertProject(newProject:Project):Observable<Project>{
    
    var requestHeaders=new HttpHeaders();
    requestHeaders=requestHeaders.set("X-XSRF-TOKEN",sessionStorage['XSRFRequestToken']);
    return this.httpClient.post<Project>("/api/projects",newProject,{headers:requestHeaders,responseType:"json"})
  }
  updateProject(existingproject:Project):Observable<Project>{  
    //alert(existingproject.projectID);
    return this.httpClient.put<Project>("/api/projects",existingproject,{responseType:"json"});
  }
  DeleteProject(projectID:number):Observable<string>{
    return this.httpClient.delete<string>("/api/projects?projectID="+projectID);
  }
  searchProjects(searchBy:string,searchText:string):Observable<Project[]>{
    return this.httpClient.get<Project[]>("/api/projects/search/"+searchBy+"/"+searchText,{responseType:"json"});
  }
  getProjectByProject(projectID:Number):Observable<Project>{
    return this.httpClient.get<Project>("/api/projects/searchbyprojectid/"+projectID,{responseType:"json"})
  }
}


