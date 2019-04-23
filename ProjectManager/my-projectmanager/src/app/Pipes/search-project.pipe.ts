import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'SearchProject'
})
export class SearchProjectPipe implements PipeTransform {

  transform(items: Array<any>, searchVal: String): any {
    if (items && items.length) {
      searchVal = searchVal.toLowerCase();
      return items.filter(item => {
        if (searchVal && (         
          item.Project_name.toLowerCase().indexOf(searchVal) === -1
          && item.start_date.toLowerCase().indexOf(searchVal) === -1
          && item.end_date.toLowerCase().indexOf(searchVal) === -1
          && item.priority.toLowerCase().indexOf(searchVal) === -1
        )) {
          return false;
        }
        return true;
      });
    }
  }

}
