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

  constructor(private userService: UserService, private fb: FormBuilder) {this.createForm(); }
  angFormAddUser: FormGroup;
  users:User[];
  userValErr: boolean = false;
  error: any = { isError: false, errorMessage: '' };
  ngOnInit() {
    this.getallusers();
  }

  getallusers()
  {
    this.userService
    .getUsers()
    .subscribe((data: User[]) => {
      this.users = data;
    });
  }
  createForm() {
    this.angFormAddUser = this.fb.group({
      txt_first_name: ['', Validators.required],
      txt_last_name: ['',Validators.required],
      txt_emp_id:['',Validators.required],
      txt_search: ['']

    });
  }

  ValidateUser(val) {
    if (val == undefined || val.length == 0)
      this.userValErr = true;
    else
      this.userValErr = false;
  }

   //Function to Add a task
   adduser(fname,  lname, empid) {
    
        this.userService.addUser(fname,  lname, empid).subscribe(
          res => {
            if (res)
            {

              window.confirm(res.Message);
              this.getallusers();
            }
          }
        );
    
      }


}
