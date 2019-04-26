import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import User from '../User';
import { SearchUserPipe } from '../Pipes/search-user.pipe'

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  constructor(private userService: UserService, private fb: FormBuilder) { this.createForm(); }
  angFormAddUser: FormGroup;
  users: User[];
  userValErr: boolean = false;
  fname: String = "";
  lname: String = "";
  empID: String = "";
  _ID: String = "";
  updateMode: boolean = false;
  // error: any = { isError: false, errorMessage: '' };
  ngOnInit() {
    this.getallusers();
  }

  getallusers() {
    this.userService
      .getUsers()
      .subscribe((data: User[]) => {
        this.users = data;
      });
  }
  createForm() {
    this.angFormAddUser = this.fb.group({
      txt_first_name: ['', Validators.required],
      txt_last_name: ['', Validators.required],
      txt_emp_id: ['', Validators.required],
      txt_search: ['']

    });
  }



  sortdata(param) {
    this.userService.sortdata(param).subscribe(
      (data: User[]) => {
        this.users = data;  
      }
    )
  }

  //Function to Add a task
  adduser(fname, lname, empid) {
    this.userService.addUser(fname, lname, empid).subscribe(
      res => {
        if (res) {
          window.confirm(res.Message);
          this.getallusers();
        }
      }
    );

  }


  //Function to delete task
  deleteuser(user_id) {
    if (window.confirm("Are you sure you want to delete this user?")) {
      this.userService.deleteUser(user_id).subscribe(res => {
        this.userService
          .getUsers()
          .subscribe((data: User[]) => {
            this.users = data;
          });
        window.confirm("User Deleted Successfully!!")
      });
    }
  }

  //Function to delete task
  edituser(user) {
    this.fname = user.user_fname;
    this.lname = user.user_lname;
    this.empID = user.user_empID;
    this._ID = user._id;
    this.updateMode = true;
  }

  updateuser()
  {
    this.userService.updateUser(this.fname, this.lname, this.empID, this._ID).subscribe(res => {;
      this.userService
        .getUsers()
        .subscribe((data: User[]) => {
          this.users = data;
          window.confirm("User updated Sucessfully!!");
        })
      });
  }



}
