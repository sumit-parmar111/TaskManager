import { Directive } from '@angular/core';
import { AbstractControl, AsyncValidator, NG_ASYNC_VALIDATORS, ValidationErrors } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { Country } from '../models/country';
import { CountriesService } from '../services/countries.service';

@Directive({
  selector: '[appCountryuniquevalidator]',
  providers:[{provide:NG_ASYNC_VALIDATORS,useExisting:CountryuniquevalidatorDirective,multi:true}]
})
export class CountryuniquevalidatorDirective implements AsyncValidator{

  constructor (private countriesService:CountriesService) { };
  validate(control: AbstractControl<any, any>): Observable<ValidationErrors> {    
    return this.countriesService.getcountrybyname(control.value).pipe(map((existingcountry:Country)=>{     
      if(existingcountry.countryName){       
        return { uniqueCountryID:{valid:false}};
      }
      else{
        return null;
      }
    }))
  
  
  }


}
