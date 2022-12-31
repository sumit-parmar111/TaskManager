import { Directive } from '@angular/core';
import { AbstractControl, AsyncValidator, NG_ASYNC_VALIDATORS, ValidationErrors } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { Project } from '../models/project';
import { ProjectsService } from '../services/projects.service';



@Directive({
  selector: '[appProjectIDUniqueValidator]',
  providers:[{provide:NG_ASYNC_VALIDATORS,useExisting:ProjectIDUniqueValidatorDirective,multi:true}]
})
export class ProjectIDUniqueValidatorDirective implements AsyncValidator {

  constructor(private projectService:ProjectsService) { }
  validate(control: AbstractControl<any, any>): Observable<ValidationErrors> {
    
    return this.projectService.getProjectByProject(control.value).pipe(map((existingproject:Project)=>{
      if(existingproject.projectID!=0){       
        return { uniqueProjectID:{valid:false}};
      }
      else{
        return null;
      }
    }))
  }
}
