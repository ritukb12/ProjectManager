import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { SearchTask } from '../searchTask.pipe'
import { RouterTestingModule } from '@angular/router/testing';
import { ViewTask } from './ViewTask.component';
import { UpdateTask } from '../Update Task/UpdateTask.component'
import { AppRoutingModule } from '../app-routing.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AddTask } from '../Add Task/AddTask.component'

describe('View Task Component', () => {
    let component: ViewTask;
    let fixture: ComponentFixture<ViewTask>;
    let de: DebugElement;
    let el: HTMLElement;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ViewTask, SearchTask, UpdateTask, AddTask],
            imports: [
                CommonModule,
                FormsModule,
                ReactiveFormsModule,
                HttpClientModule,
                RouterTestingModule.withRoutes([
                    { path: "AddTask", component: AddTask },
                    { path: "ViewTask", component: ViewTask },
                    { path: "editTask/:id", component: UpdateTask },
                    { path: '', redirectTo: '/', pathMatch: 'full' }]),
                AppRoutingModule
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
        fixture = TestBed.createComponent(ViewTask);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create component', () => {
        expect(component).toBeDefined();
    });


});
