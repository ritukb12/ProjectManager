import { SearchUserPipe } from './search-user.pipe';
import { TestBed, inject } from '@angular/core/testing';
import { mockUsers } from '../mockdata/Users.mock'

describe('SearchUserPipe', () => {
  it('create an instance', () => {
    const pipe = new SearchUserPipe();
    expect(pipe).toBeTruthy();
  });

  it('filters the users based on input', () => {
    const pipe = new SearchUserPipe();
    expect(pipe.transform(mockUsers, 'user Af')).toEqual(
      [{
        user_fname: 'user Af',
        user_lname: 'user Al',
        user_empID :'user A'
      }]
    );
  });

});
