import { Component, ContentChild, OnInit } from '@angular/core';

@Component({
  selector: 'app-check-box-printer',
  templateUrl: './check-box-printer.component.html',
  styleUrls: ['./check-box-printer.component.scss']
})


export class CheckBoxPrinterComponent implements OnInit{
  isChecked: boolean = false;
  ngOnInit(){

  }
  check(){
    this.isChecked=true;
  }
  unCheck(){
    this.isChecked=false;
  }
  @ContentChild("selectionBox") selectionBox:CheckBoxPrinterComponent;

  isAllCheckChange(b:boolean){
    if(b){
      this.selectionBox.check();
    }
    else{
      this.selectionBox.unCheck();
    }
  }
}
