import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {  Router } from '@angular/router';
import { CanComponentDeactivate } from 'src/app/guards/can-deactivate-guard.service';

import { Country } from '../../models/country';

import { LoginService } from '../../services/login.service';
import { SignUpViewModel } from '../../models/sign-up-view-model';
import { CountriesService } from 'src/app/services/countries.service';
import { CustomValidatorsService } from 'src/app/services/custom-validators.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit,CanComponentDeactivate{
  signUpForm:FormGroup|any=null;
  genders=["male","female"];
  countries:Country[]=[];
  registerError:string|null=null;
  canLeave:boolean=true;
  constructor(private countriesService:CountriesService,private formbuilder:FormBuilder,private customValidatorsService:CustomValidatorsService,private loginService:LoginService,private router:Router){
    // this.ngOnInit();
  }
  ngOnInit(){
    this.countriesService.getCountries().subscribe(
      (response)=>
      {
        this.countries=response;
      }
      );
    this.signUpForm=this.formbuilder.group({
      personName:this.formbuilder.group({
        firstName:[null,[Validators.required,Validators.minLength(3)]],
      lastName:[null,[Validators.required,Validators.minLength(3)]],
      }),
      
      email:[null,[Validators.required,Validators.email],[this.customValidatorsService.DuplicateEmailValidator()]],
      mobile:[null,[Validators.required,Validators.pattern(/^[789]\d{9}$/)]],
      dateOfBirth:[null,[Validators.required,this.customValidatorsService.minimumAgeValidator(18)]],
      password:[null,[Validators.required]],
      confirmpassword:[null,[Validators.required]],
      gender:[null,[Validators.required]],
      countryID:[null,[Validators.required]],
      receiveNewsLatter:null,
      skills:this.formbuilder.array([])
    },{
      validators: [
        this.customValidatorsService.compareValidator("confirmpassword", "password")
      ]
    });

    this.signUpForm.valueChanges.subscribe((value:any)=>{
       //console.log(value);   
      this.canLeave=false;
      });
    

    
  }
  onSubmitClick(){

    // this.signUpForm.setValue({
    //         firstName: "sumit",
    //         lastName: "parmar",
    //         email: "sumit@gmail.com",
    //         mobile: "6352363185",
    //         dateOfBirth: "2022-02-01",
    //         gender: "male",
    //         countryID: 3,
    //         receiveNewsLatter: true 
    // }); 
    
    // console.log(this.signUpForm);
    // this.signUpForm.patchValue({
    //           firstName: "sumit",
    //         lastName: "parmar",
    //         email: "sumit@gmail.com"
    // })
    // this.signUpForm.reset({
    //             firstName: "sumit",
    //           lastName: "parmar",
    //           email: "sumit@gmail.com"
    //   });

     this.signUpForm["submitted"]=true;
     //console.log(this.signUpForm);
     if(this.signUpForm.valid)
     {
      var signUpViewModel1=this.signUpForm.value as SignUpViewModel;
      this.loginService.Register(signUpViewModel1).subscribe({
        next:(response)=>{
          this.canLeave=true;
          this.router.navigate(["/employee","tasks"]);
        },
        error:(error)=>{
          console.log(error);
          this.registerError="Unable To Submit";
          alert("while log ing");
        }         

      });
      
      
     }

  }
  OnAddSkill(){
    var formgroup=new FormGroup({
      skillName:new FormControl(null,[Validators.required]),
      skillLevel:new FormControl(null,[Validators.required])
    });
    (<FormArray>this.signUpForm.get('skills')).push(formgroup);
    
  }
  OnRemoveSkill(index:number){
    (<FormArray>this.signUpForm.get('skills')).removeAt(index);
  }

}


