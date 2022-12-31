import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, ContentChild, ContentChildren, DoCheck, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, QueryList, SimpleChanges, ViewChildren } from '@angular/core';
import { Subscription } from 'rxjs';
import { Project } from 'src/app/models/project';
import { ProjectsService } from 'src/app/services/projects.service';
import { CheckBoxPrinterComponent } from '../check-box-printer/check-box-printer.component';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnChanges,OnInit,DoCheck,AfterContentInit,AfterContentChecked,AfterViewInit,AfterViewChecked,OnDestroy {
  @Input("currentProject") project:Project;
  @Input("recordIndex")i:number;
  @Output() editClick=new EventEmitter();
  @Output() deleteClick=new EventEmitter();
 // hideDetails:boolean=false;

 hideDetails:boolean=false;
 MySubscription:Subscription;
  constructor(public projectsService:ProjectsService){

  }

  ngOnChanges(simpleChanges:SimpleChanges){
    //console.info("=======ngOnChanges Called======")
    for(let propName in simpleChanges){
      let chng=simpleChanges[propName];
      let cur=JSON.stringify(chng.currentValue);
      let prev=JSON.stringify(chng.previousValue);
      //console.log(`$propName:curreentValue=${cur},previousValue=${prev}`);
    }
    if(simpleChanges["project"]){
      //this.project.teamSize+=1; 
    }
  }

  ngOnInit(){

    //console.info("=======ngOnInit Called======");
    this.MySubscription=this.projectsService.MySubject.subscribe((hide)=>{
      this.hideDetails=hide;
    });

  }
  
  ngDoCheck(){
    //console.info("=======ngDoCheck Called======");
  }
  ngAfterContentInit(){
    // console.info("=======ngAfterContentInit Called======");
    // console.log(this.selectionBoxes.toArray())
  }
  ngAfterContentChecked(){
    //console.info("=======ngAfterContentChecked Called======");
  }
  ngAfterViewInit(): void {
    //console.info("=======ngAfterViewInit Called======");
  }
  ngAfterViewChecked(): void {
   // console.info("=======ngAfterViewChecked Called======");
  }

  onEditClick(event,i){
    this.editClick.emit({event,i});
  }
  onDeleteClick(event,i){
    this.deleteClick.emit({event,i});
  }
  // toggleDetails(){
  //   this.hideDetails=!this.hideDetails;
  // }

  ngOnDestroy(){
    //console.info("=======ngOnDestroy Called======");
    this.MySubscription.unsubscribe();
  }

 // @ContentChild("selectionBox") selectionBox:CheckBoxPrinterComponent;
 @ContentChildren("selectionBox") selectionBoxes: QueryList<CheckBoxPrinterComponent> | any = null;
  isAllCheckChange(b: boolean)
   {
  //   if(b){
  //     this.selectionBox.check();
  //   }
  //   else{
  //     this.selectionBox.unCheck();
  //   }
    let selectionBox = this.selectionBoxes.toArray();
    if (b)
    {
      for (let i = 0; i < selectionBox.length; i++)
      {
        selectionBox[i].check();
      }
    }
    else
    {
      for (let i = 0; i < selectionBox.length; i++)
      {
        selectionBox[i].unCheck();
      }
    }
  }
}
