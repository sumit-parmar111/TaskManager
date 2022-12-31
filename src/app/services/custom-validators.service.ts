import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, FormControl, ValidatorFn, AsyncValidatorFn } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class CustomValidatorsService {

  constructor(private loginService:LoginService) { }


  public minimumAgeValidator(minAge:number):ValidatorFn{
    return(control:AbstractControl):ValidationErrors|null=>
    {
      if(!control.value)
        return null;
      var today=new Date();
      var dateOfBirth=new Date(control.value);
      var diffMs=Math.abs(today.getTime()-dateOfBirth.getTime());
      var diffYears=(diffMs/(1000*60*60*24))/365.25;

      if(diffYears>=minAge)
      {
        return null;
      }
      else{
        return {minAge:{valid:false}};
      }
       

    };
  }


  public compareValidator(controlToValidate: string, controlToCompare: string): ValidatorFn
  {
    return (formGroup: AbstractControl): ValidationErrors | null =>
    {
      if (!(formGroup.get(controlToValidate) as any).value)
        return null; //return, if the confirm password is null

      if ((formGroup.get(controlToValidate) as any).value == (formGroup.get(controlToCompare) as any).value)
        return null; 
      else
      {
        (formGroup.get(controlToValidate) as FormControl).setErrors({ compareValidator: { valid: false } });
        return { compareValidator: { valid: false } }; //invalid
      }      
    };
  }

  public DuplicateEmailValidator(): AsyncValidatorFn
  {
    return (control: AbstractControl): Observable<ValidationErrors | null> =>{
      console.log(control.value);
       return this.loginService.getuserbyEmail(control.value).pipe(map((existingUser:any)=>{
        if(existingUser!=null){  
          return {uniqueEmail:{valid:false}};
        }
        else{
          return null;
        }
      }))
    }

    
    
  }
 
  }

