import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddProjectComponent } from './add-project.component';
import { SearchProjectPipe } from '../pipes/search-project.pipe';
import { SearchUserPipe } from '../pipes/search-user.pipe';
import { DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

describe('AddProjectComponent', () => {
  let component: AddProjectComponent;
  let fixture: ComponentFixture<AddProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddProjectComponent,SearchProjectPipe,SearchUserPipe ],
      imports :[FormsModule,ReactiveFormsModule, HttpClientModule],
      providers:[DatePipe]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
