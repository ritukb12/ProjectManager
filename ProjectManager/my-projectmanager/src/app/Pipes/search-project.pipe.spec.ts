import { SearchProjectPipe } from './search-project.pipe';
import { TestBed, inject } from '@angular/core/testing';
import { mockProjects } from '../mockdata/Projects.mock'

beforeEach(() => {

  TestBed.configureTestingModule({

  });
});

describe('SearchProjectPipe', () => {
  it('create an instance', () => {
    const pipe = new SearchProjectPipe();
    expect(pipe).toBeTruthy();
  });

  it('filters the projects based on input', () => {
    const pipe = new SearchProjectPipe();
    expect(pipe.transform(mockProjects, 'proj A')).toEqual(
      [{
        Project_name: "proj A",
        start_date: '12-11-2019',
        end_date: '12-12-2019',
        priority: '1',
        projectended: false,
        manager_ID: '123'
      }]
    );
  });

});
