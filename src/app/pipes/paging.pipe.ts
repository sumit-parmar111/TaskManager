import { Pipe, PipeTransform } from '@angular/core';
import { Project } from '../models/project';

@Pipe({
  name: 'paging'
})
export class PagingPipe implements PipeTransform {

  transform(value:Project[] ,currentPageIndex:number,pageSize:number): any {
    if(value==null){
      return null;
    }
    let resultArray=[];
    for(let j=currentPageIndex*pageSize;j<(currentPageIndex+1)*pageSize;j++){
      if(value[j]){
        resultArray.push(value[j]);
      }
    }
    return resultArray;    
  }

}
 