import { Component,OnInit} from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit 
{
  Designation:string;
  Username:string;
  NoOfTeamMembers:number=0;
  TotalCostOfAllProjects:number=0;
  PendingTasks:number=0;
  UpComingProjects:number=0;
  ProjectCost:number=0;
  CurrentExpenditure:number=0;
  AvailableFunds:number=0;
  ToDay:Date;

  Clients:string[];
  Projects:string[];
  Years:number[]=[];
  TeamMembersSummary:any=[];
  TeamMembers:any=[];

  constructor(private dashboardService:DashboardService){

  }

  ngOnInit()
  {
    this.ToDay=new Date();
    this.Designation="Team Leader";
    this.Username="Sumit Parmar";
    this.NoOfTeamMembers=67;
    this.TotalCostOfAllProjects=23;
    this.PendingTasks=45;
    this.UpComingProjects=0.6;  
    this.PendingTasks=98;    
    this.Clients=["ABC Infoteach Ltd.","Paralog Ingotech","OM Industry"];
    this.Projects=["Project A","Project B","Project C","Project D"];
    for(var i=2022;i>=2012;i--){
      this.Years.push(i);
    }
    this.TeamMembersSummary=this.dashboardService.getTeamMembersSummary();
    this.TeamMembers=[
    {
      Region:"East",Members:[
        {ID:1,Name:"Ford",Status:"Available"},
        {ID:1,Name:"scott",Status:"Available"},
        {ID:3,Name:"Tiger",Status:"Busy"}
      ]
    },
    {
      Region:"West",Members:[
        {ID:1,Name:"Ford",Status:"Busy"},
        {ID:1,Name:"scott",Status:"Busy"},
        {ID:3,Name:"Tiger",Status:"Busy"}
      ]
    },
    {
      Region:"South",Members:[
        {ID:1,Name:"Ford",Status:"Available"},
        {ID:1,Name:"scott",Status:"Busy"},
        {ID:3,Name:"Tiger",Status:"Busy"}
      ]
    },
    {
      Region:"North",Members:[
        {ID:1,Name:"Ford",Status:"Busy"},
        {ID:1,Name:"scott",Status:"Available"},
        {ID:3,Name:"Tiger",Status:"Busy"}
      ]
    }    
    ];
  }

  onProjectChange($event: any)
  {
    if ($event.target.innerHTML.trim() == 'Project A')
    {
      
      this.ProjectCost = 500;
      this.CurrentExpenditure = 600;
      this.AvailableFunds = 700;
    } else if ($event.target.innerHTML.trim() == 'Project B')
    {
      this.ProjectCost = 502;
      this.CurrentExpenditure = 602;
      this.AvailableFunds = 702;
    } else if ($event.target.innerHTML.trim() == 'Project C')
    {
      this.ProjectCost = 503;
      this.CurrentExpenditure = 603;
      this.AvailableFunds = 703;
    } else if ($event.target.innerHTML.trim() == 'Project D')
    {
      this.ProjectCost = 5004
      this.CurrentExpenditure = 604;
      this.AvailableFunds = 704;
    }
  }
}
