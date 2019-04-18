import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'SearchUser'
})
export class SearchUserPipe implements PipeTransform {

  transform(items: Array<any>, searchVal: String): any {
    if (items && items.length) {
      return items.filter(item => {
        if (searchVal && (
          item.user_fname.indexOf(searchVal) === -1
          && item.user_lname.indexOf(searchVal) === -1
          && item.user_empid.indexOf(searchVal) === -1
        )) {
          return false;
        }
        return true;
      });
    }
  }

}
