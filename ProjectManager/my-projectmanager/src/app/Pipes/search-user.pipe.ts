import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'SearchUser'
})
export class SearchUserPipe implements PipeTransform {

  transform(items: Array<any>, searchVal: String): any {
    if (items && items.length) {
      searchVal = searchVal.toLowerCase();
      return items.filter(item => {
        if (searchVal && (
          item.user_fname.toLowerCase().indexOf(searchVal) === -1
          && item.user_lname.toLowerCase().indexOf(searchVal) === -1
          && item.user_empID.toLowerCase().indexOf(searchVal) === -1
        )) {
          return false;
        }
        return true;
      });
    }
  }

}
