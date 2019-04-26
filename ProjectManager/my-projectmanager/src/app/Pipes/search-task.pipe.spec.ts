import { SearchTaskPipe } from './search-task.pipe';
import { DatePipe } from '@angular/common';
import { TestBed, inject } from '@angular/core/testing';

describe('SearchTaskPipe', () => {
  const tasks = [
      {
          "task_name": 'abc',
          "parent_task_name": '',
          "start_date": '12/12/2018',
          "end_date": '12/12/2018',
          "priority": '50'
      },
      {
          "task_name": 'abc 1',
          "parent_task_name": 'abc',
          "start_date": '12/12/2019',
          "end_date": '12/12/2019',
          "priority": '5'
      }]
  beforeEach(() => {  
      
  TestBed.configureTestingModule({
      providers: [DatePipe]
    });
  });
  it('create an instance', inject([DatePipe], (datePipe: DatePipe) =>  {
      const pipe = new SearchTaskPipe(datePipe);
      expect(pipe).toBeTruthy();
  }));

  it("Filter Tasks by task name", inject([DatePipe], (datePipe: DatePipe) => {
      
      const pipe = new SearchTaskPipe(datePipe);
      expect(pipe.transform(tasks, 'abc', null, null, null, null, null)).toEqual(
          [ {
              "task_name": 'abc',
              "parent_task_name": '',
              "start_date": '12/12/2018',
              "end_date": '12/12/2018',
              "priority": '50'
          },
          {
              "task_name": 'abc 1',
              "parent_task_name": 'abc',
              "start_date": '12/12/2019',
              "end_date": '12/12/2019',
              "priority": '5'
          }]
      );
  }));

  it("Filter Tasks by task parent", inject([DatePipe], (datePipe: DatePipe) => {
      
      const pipe = new SearchTaskPipe(datePipe);
      expect(pipe.transform(tasks, 'abc', 'abc', null, null, null, null)).toEqual(
          [ 
          {
              "task_name": 'abc 1',
              "parent_task_name": 'abc',
              "start_date": '12/12/2019',
              "end_date": '12/12/2019',
              "priority": '5'
          }]
      );
  }));

  it("Filter Tasks by priority From", inject([DatePipe], (datePipe: DatePipe) => {
      
      const pipe = new SearchTaskPipe(datePipe);
      expect(pipe.transform(tasks, 'abc', '', 25, null, null, null)).toEqual(
          [ 
              {
                  "task_name": 'abc',
                  "parent_task_name": '',
                  "start_date": '12/12/2018',
                  "end_date": '12/12/2018',
                  "priority": '50'
              }]
      );
  }));


  it("Filter Tasks by priority To", inject([DatePipe], (datePipe: DatePipe) => {
      
      const pipe = new SearchTaskPipe(datePipe);
      expect(pipe.transform(tasks, 'abc', null, null, 55, null, null)).toEqual(
          [ 
              {
                  "task_name": 'abc',
                  "parent_task_name": '',
                  "start_date": '12/12/2018',
                  "end_date": '12/12/2018',
                  "priority": '50'
              },
              {
                  "task_name": 'abc 1',
                  "parent_task_name": 'abc',
                  "start_date": '12/12/2019',
                  "end_date": '12/12/2019',
                  "priority": '5'
              }]
      );
  }));

  it("Filter Tasks by Start Date ", inject([DatePipe], (datePipe: DatePipe) => {
      
      const pipe = new SearchTaskPipe(datePipe);
      expect(pipe.transform(tasks, 'abc', null, null, null, '12/12/2019', null)).toEqual(
          [ 
            
              {
                  "task_name": 'abc 1',
                  "parent_task_name": 'abc',
                  "start_date": '12/12/2019',
                  "end_date": '12/12/2019',
                  "priority": '5'
              }]
      );
  }));

  it("Filter Tasks by End Date ", inject([DatePipe], (datePipe: DatePipe) => {
      
      const pipe = new SearchTaskPipe(datePipe);
      expect(pipe.transform(tasks, 'abc', null, null, null, null, '12/12/2018')).toEqual(
          [ 
            
              {
                  "task_name": 'abc',
                  "parent_task_name": '',
                  "start_date": '12/12/2018',
                  "end_date": '12/12/2018',
                  "priority": '50'
              }]
      );
  }));
});