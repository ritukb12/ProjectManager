import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'SearchProject'
})
export class SearchProjectPipe implements PipeTransform {

  transform(items: Array<any>, searchVal: String): any {
    if (items && items.length) {
      return items.filter(item => {
        if (searchVal && (         
          item.Project_name.indexOf(searchVal) === -1
          && item.start_date.indexOf(searchVal) === -1
          && item.priority.indexOf(searchVal) === -1
          && item.projectended.indexOf(searchVal) === -1
        )) {
          return false;
        }
        return true;
      });
    }
  }

}
