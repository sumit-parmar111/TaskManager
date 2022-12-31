import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ClientLocation } from 'src/app/models/client-location';

import { Project } from 'src/app/models/project';

import * as $ from "jquery";
import { DatePipe } from '@angular/common'
import { ProjectComponent } from '../project/project.component';
import { ProjectsService } from 'src/app/services/projects.service';
import { ClientLocationsService } from 'src/app/services/client-locations.service';
import { FilterPipe } from 'src/app/pipes/filter.pipe';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  [x: string]: any;

  projects: Project[] = [];
  clientLocations: ClientLocation[] = [];
  showLoading: boolean = true;
  newProject: Project = new Project();
  editProject: Project = new Project();
  editIndex: any = null;
  deleteProject: Project = new Project();
  deleteIndex: any = null;
  searchBy: string = "projectName";
  searchText: string = "";

  currentPageIndex:number=1;
  pages:any[]=[];
  pageSize:number=3;

  @ViewChild("newForm") newForm: NgForm | any = null;
  @ViewChild("editForm") editForm: NgForm | any = null;
  // isAllChecked:boolean=false;

  // @ViewChildren("prj") projs : QueryList<ProjectComponent> | any = null;
  // isAllCheckedChange(event:any){
  //   let proj=this['projs'].toArray();
  //   for(let i=0;i<proj.length;i++){
  //     proj[i].isAllCheckedChange(this.isAllChecked);
  //   }

  // }



  constructor(private projectservice: ProjectsService, private clientLocationService: ClientLocationsService, public datepipe: DatePipe) {
  }

  
  
  ngOnInit() {
    this.projectservice.getAllProjects().subscribe(
      (Response: Project[]) => {

        this.projects = Response;
        this.showLoading = false;
        this.calculateNoOfPages();
      }
    );
    // (error)=>{
    //   alert("Not Auyhorize");
    // }

    this.clientLocationService.getClientLocations().subscribe(
      (response) => {
        this.clientLocations = response;
      }
    )


  }
  calculateNoOfPages(){
    let filterPipe=new FilterPipe();
    var resultProjects=filterPipe.transform(this.projects,this.searchBy,this.searchText);
    var noOfPages=Math.ceil(resultProjects.length/this.pageSize);

    this.pages=[];
    for(let i=0;i<noOfPages;i++){
      this.pages.push({pageIndex:i});
    } 
    this.currentPageIndex=0;
  }

  @ViewChild("#prjID") prjID1:ElementRef|any=null;
  onNewClick(event:any) {
    debugger;
    this.newForm.resetForm();
    setTimeout(()=>{
     // this.prjID1.nativeElement.focus();
    },1000)
  }
  

  isAllChecked: boolean = false;

  @ViewChildren("prj") projs : QueryList<ProjectComponent> | any = null;

  isAllCheckedChange(event: any)
  {
    let proj = this.projs.toArray();
    for (let i = 0; i < proj.length; i++)
    {
      proj[i].isAllCheckChange(this.isAllChecked);
    }
  }


  onSaveClick() {    
    if (this.newForm.valid) {
      this.newProject.clientLocation.clientLocationID = 0;   
      if(this.newProject.active==null)   {
        this.newProject.active=false;
      }
      this.projectservice.insertProject(this.newProject).subscribe({
        next: (response) => {
          alert(response.projectName + "  Created Sucessfully");
          
          var p: Project = new Project();
          p.projectID = response.projectID;
          p.projectName = response.projectName;
          p.dateOfStart = response.dateOfStart;
          p.teamSize = response.teamSize;
          p.clientLocation = response.clientLocation;
          p.active = response.active;
          p.clientLocationID = response.clientLocationID;
          p.status = response.status;
          this.projects.push(p);


          //clear
          this.newProject.projectID = null;
          this.newProject.projectName = null;
          this.newProject.dateOfStart = null;
          this.newProject.teamSize = null;
          this.newProject.active = false;
          this.newProject.clientLocationID = null;
          this.newProject.status = null;

          $("#newFormCancel").trigger("click");
          this.calculateNoOfPages();
        },
        error: (error) => {
          alert('There was an error in inserting data from the server');
        }
      });
     
    }


  }


  onPageIndexClicked(pageIndex:number){
    this.currentPageIndex=pageIndex;
  }



cal(date1){
  const newDate=new Date(date1);
  const result = new Date(newDate.setDate(newDate.getDate() + 1));
  return result;
}
  onEditClick(event: any, index: number) {
      
    this.editForm.resetForm();
    setTimeout(() => {

      this.editProject.projectID = this.projects[index+this.currentPageIndex *this.pageSize].projectID;
      this.editProject.projectName = this.projects[index+this.currentPageIndex *this.pageSize].projectName;

      let myDate = this.projects[index+this.currentPageIndex *this.pageSize].dateOfStart.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3")
      let newDate = this.datepipe.transform(myDate, 'yyyy-MM-dd', 'es-ES');
      
      this.editProject.dateOfStart = newDate;      
      this.editProject.teamSize = this.projects[index+this.currentPageIndex *this.pageSize].teamSize;
      this.editProject.active = this.projects[index+this.currentPageIndex *this.pageSize].active;
      this.editProject.status = this.projects[index+this.currentPageIndex *this.pageSize].status;
      this.editProject.clientLocationID = this.projects[index+this.currentPageIndex *this.pageSize].clientLocationID;
      this.editProject.clientLocation = this.projects[index+this.currentPageIndex *this.pageSize].clientLocation;
      this.editIndex = index;
    }, 100);
  }
  onUpdateClick() {

    if (this.editForm.valid) {
      this.projectservice.updateProject(this.editProject).subscribe({
        next: (response: Project) => {
          alert(response.projectName + " Updated Sucessfully.");
          var p: Project = new Project();
          p.projectID = response.projectID;
          p.projectName = response.projectName;
          p.dateOfStart = response.dateOfStart;
          p.teamSize = response.teamSize;
          p.active = response.active;
          p.status = response.status;
          p.clientLocationID = response.clientLocationID;
          p.clientLocation = response.clientLocation;
          this.projects[this.editIndex] = p;

          this.editProject.projectID = null;
          this.editProject.projectName = null;
          this.editProject.dateOfStart = null;
          this.editProject.teamSize = null;
          this.editProject.active = false;
          this.editProject.status = false;
          this.editProject.clientLocationID = response.clientLocationID;
          this.editProject.clientLocation = response.clientLocation;
          $("#editFormCancel").trigger("click");
        },
        error: (error) => {
          alert('There was an error while updating the project');
        }
      });
    }


  }
  onDeleteClick(event: any, index: number) {

    this.deleteIndex = index;

    this.deleteProject.projectID = this.projects[index+this.currentPageIndex *this.pageSize].projectID;
    this.deleteProject.projectName = this.projects[index+this.currentPageIndex *this.pageSize].projectName;
    this.deleteProject.dateOfStart = this.projects[index+this.currentPageIndex *this.pageSize].dateOfStart;
    this.deleteProject.teamSize = this.projects[index+this.currentPageIndex *this.pageSize].teamSize;

  }
  onDeleteConfirmClick() {
    this.projectservice.DeleteProject(this.deleteProject.projectID).subscribe({
      next: (response) => {
        alert("Deleted Sucessfully.");
        this.projects.splice(this.deleteIndex, 1);
        this.deleteProject.projectID = null;
        this.deleteProject.projectName = null;
        this.deleteProject.dateOfStart = null;
        this.deleteProject.teamSize = null;
        this.calculateNoOfPages();

      },
      error: (error) => {
        alert('There was an error while Deleting the project');
      }
    });

  }
  // onSearchClick() {

  //   this.projectservice.searchProjects(this.searchBy, this.searchText).subscribe(
  //     (response: Project[]) => {
  //       console.log(response);
  //       this.projects = response;
  //       console.log(this.projects);

  //     },
  //     (error) => {
  //       alert('There was an error while Searching the project');
  //     }
  //   );

  // }

  onSearchKeyTextup(event:any){
    this.calculateNoOfPages();
  }

  //@ViewChildren("prj") prj: QueryList<ProjectComponent> | any = null;
  onHideShowDetails(event: any) {
    // let pro = this.prj.toArray();
    // for (let i = 0; i < pro.length; i++) {
    //   pro[i].toggleDetails();
    // }
    this.projectservice.toggleDetails();
  }
}
