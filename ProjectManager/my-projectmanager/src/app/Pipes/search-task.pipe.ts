import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'SearchTask'
})
export class SearchTaskPipe implements PipeTransform {

  rtitems: Array<any>;
  start_date: any;
  end_date: any;
  constructor( private datePipe: DatePipe){}
  transform(items: Array<any>, taskNameSearch: String, parentNameSearch: String, priorityFrom: number,
    priorityTo: number, startDate: String, endDate: String) {
  
    if (items && items.length) {
      return items.filter(item => {
        this.start_date = this.datePipe.transform(item.start_date, "yyyy-MM-dd");
        this.end_date = this.datePipe.transform(item.end_date, "yyyy-MM-dd");
        startDate = this.datePipe.transform(startDate, "yyyy-MM-dd");
        endDate = this.datePipe.transform(endDate, "yyyy-MM-dd");
        if (taskNameSearch && item.task_name.indexOf(taskNameSearch) === -1) {
          return false;
        }
        if (parentNameSearch && item.parent_task_name.indexOf(parentNameSearch) === -1) {
          return false;
        }
        if (priorityFrom && Number(item.priority) < priorityFrom) {
          return false;
        }
        if (priorityTo && Number(item.priority) > priorityTo) {
          return false;
        }
        if (startDate &&  this.start_date != startDate) {
          return false;
        }
        if (endDate &&  this.end_date != endDate) {
          return false;
        }



        return true;
      })

     
    }
    else {
      return items;
    }
  }
}
