import { Component, ComponentFactoryResolver, OnInit, QueryList, ViewChild, ViewChildren, ViewContainerRef } from '@angular/core';
import { ComponentLoaderDirective } from 'src/app/directives/component-loader.directive';
import { TasksComponent } from 'src/app/employee/components/tasks/tasks.component';
import { ClientLocationsComponent } from '../client-locations/client-locations.component';
import { CountriesComponent } from '../countries/countries.component';
import { TaskPrioritiesComponent } from '../task-priorities/task-priorities.component';
import { TaskStatusComponent } from '../task-status/task-status.component';

@Component({
  selector: 'app-masters',
  templateUrl: './masters.component.html',
  styleUrls: ['./masters.component.scss']
})
export class MastersComponent implements OnInit {



  @ViewChildren(ComponentLoaderDirective)
  componentLoaders: QueryList<ComponentLoaderDirective> | any = null;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {

  }
  ngOnInit() {

  }


  masterMenuItems = [
    { itemName: "Countries", displayName: "Countries", component: CountriesComponent },
    { itemName: "ClientLocations", displayName: "Client Locations", component: ClientLocationsComponent },
    { itemName: "TaskPriorities", displayName: "Task Priorities", component: TaskPrioritiesComponent },
    { itemName: "TaskStatus", displayName: "Task Status", component: TaskStatusComponent },
  ];

  activeItem: string = "";
  tabs: any[] = [];


  menuItemClick(clickedMasterMenuItem: any) {
    //console.log(clickedMasterMenuItem);
    this.activeItem = clickedMasterMenuItem.itemName;
    let matchingTabs = this.tabs.filter((tab) => {
      return tab.itemName == clickedMasterMenuItem.itemName
    });



    if (matchingTabs.length == 0) {
      this.tabs.push({
        tabIndex: this.tabs.length,
        itemName: clickedMasterMenuItem.itemName,
        displayName: clickedMasterMenuItem.displayName
      });

      setTimeout(() => {
        var componentLoadersArray = this.componentLoaders.toArray();
        var componentFactory = this.componentFactoryResolver.resolveComponentFactory(clickedMasterMenuItem.component);
        var viewContainerRef = componentLoadersArray[this.tabs.length - 1].viewContainerRef;
        this.tabs[this.tabs.length - 1].viewContainerRef = viewContainerRef;
        var componentRef = viewContainerRef.createComponent(componentFactory);

        if (clickedMasterMenuItem.component.name == "CountriesComponent") {
          var componentInstance = componentRef.instance as CountriesComponent;
          //componentInstance.message = "Hello To Countries ";
        }
      }, 100);

    }
  }



  onCloseClick(clickedTab: any) {
    clickedTab.viewContainerRef.remove();
    //    console.log(this.viewContainerRef);   
    this.tabs.splice(this.tabs.indexOf(clickedTab), 1);
    if (this.tabs.length > 0) {
      this.activeItem = this.tabs[0].itemName;
    }
  }
}