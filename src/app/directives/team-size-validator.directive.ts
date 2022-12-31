import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appTeamSizeValidator]',
  providers:[{provide:NG_VALIDATORS,useExisting:TeamSizeValidatorDirective,multi:true}]
})
export class TeamSizeValidatorDirective implements Validator {

  validate(control: AbstractControl<any, any>): ValidationErrors {
    
    let currentValue=control.value;
    let isValid=currentValue%5==0;

    if(isValid){
      return null;
    }
    else{
      return {divisible:{valid:false}};
    }
  }
  constructor() { }

}
 