import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddUserComponent } from './add-user.component';
import { SearchUserPipe } from '../Pipes/search-user.pipe';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs/Rx';
import { mockUsers } from '../mockdata/Users.mock'


describe('AddUserComponent', () => {
  let component: AddUserComponent;
  let fixture: ComponentFixture<AddUserComponent>;
  let userService: UserService;
  //const mockUser = [{ user_fname: "Jack", user_lname: "Rose", user_empID: "334345" }];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddUserComponent, SearchUserPipe],
      imports: [FormsModule, ReactiveFormsModule, HttpClientModule],
      providers: [UserService]
    })
      .compileComponents();
    userService = TestBed.get(UserService);
    //userServiceSpy = TestBed.get(UserService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get users', () => {
    fixture.detectChanges();
    const spy = spyOn(userService, 'getUsers').and.returnValue(Observable.of(mockUsers));
    component.getallusers();
    fixture.detectChanges();
    expect(component.users).toEqual(mockUsers);
    expect(spy.calls.any()).toEqual(true);
  })

  it('should sort users based on fname', () => {
    fixture.detectChanges();
    const spy = spyOn(userService, 'sortdata').and.returnValue(Observable.of(mockUsers));
    component.sortdata('user_fname');
    fixture.detectChanges();
    expect(component.users).toEqual(mockUsers);
    expect(spy.calls.any()).toEqual(true);
  })

  it('should sort users based on lname', () => {
    fixture.detectChanges();
    const spy = spyOn(userService, 'sortdata').and.returnValue(Observable.of(mockUsers));
    component.sortdata('user_lname');
    fixture.detectChanges();
    expect(component.users).toEqual(mockUsers);
    expect(spy.calls.any()).toEqual(true);
  })

  it('should sort users based on empID', () => {
    fixture.detectChanges();
    const spy = spyOn(userService, 'sortdata').and.returnValue(Observable.of(mockUsers));
    component.sortdata('user_empID');
    fixture.detectChanges();
    expect(component.users).toEqual(mockUsers);
    expect(spy.calls.any()).toEqual(true);
  })


  it('form should be valid', async(() => {
    component.angFormAddUser.controls['txt_first_name'].setValue('test');
    component.angFormAddUser.controls['txt_last_name'].setValue('test1');
    component.angFormAddUser.controls['txt_emp_id'].setValue('1');
    component.angFormAddUser.controls['txt_search'].setValue('');
    expect(component.angFormAddUser.valid).toBeTruthy();
    //expect(component.angForm.valid).toBeTruthy();
  }));

  it('should set values for edit user', async(() => {
    var user = mockUsers[0];
  component.edituser(user);
  expect(component.fname).toEqual(user.user_fname);
  expect(component.lname).toEqual(user.user_lname);
  expect(component.empID).toEqual(user.user_empID);
  expect(component.updateMode).toBeTruthy();
    //expect(component.angForm.valid).toBeTruthy();
  }));


});
