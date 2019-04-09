import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { AppRoutingModule } from '../app-routing.module';
import { ViewTask } from '../View Task/ViewTask.component'
import { AddTask } from '../Add Task/AddTask.component'
import { UpdateTask } from './UpdateTask.component'
import { SearchTask } from '../searchTask.pipe'
import { RouterTestingModule } from '@angular/router/testing';

describe('Update Task Component', () => {
    let component: UpdateTask;
    let fixture: ComponentFixture<UpdateTask>;
    let de: DebugElement;
    let el: HTMLElement;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [UpdateTask, AddTask, ViewTask, SearchTask
            ],
            imports: [
                CommonModule,
                FormsModule,
                ReactiveFormsModule,
                HttpClientModule,
                AppRoutingModule,
                RouterTestingModule
            ], 
            providers: [
                {
                    provide: Router, ActivatedRoute,
                    useClass: class {
                        public navigate = jasmine.createSpy('navigate');
                    },
                },
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UpdateTask);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create component', () => {
        expect(component).toBeDefined();
    });

    // it('form should be invalid', async(() => {
    //     component.angForm1.controls['task_name'].setValue('');
    //     component.angForm1.controls['parent_task_name'].setValue('');
    //     component.angForm1.controls['priority'].setValue('');
    //     component.angForm1.controls['start_date'].setValue('');
    //     component.angForm1.controls['end_date'].setValue('');
    //     expect(component.angForm1.valid).toBeFalsy();
    //     //expect(component.angForm.valid).toBeTruthy();
    // }));

    // it('form should be valid', async(() => {
    //     component.angForm1.controls['task_name'].setValue('test');
    //     component.angForm1.controls['parent_task_name'].setValue('test1');
    //     component.angForm1.controls['priority'].setValue('1');
    //     component.angForm1.controls['start_date'].setValue('11/11/1985');
    //     component.angForm1.controls['end_date'].setValue('11/11/1985');
    //     expect(component.angForm1.valid).toBeTruthy();
    //     //expect(component.angForm.valid).toBeTruthy();
    // }));

});
