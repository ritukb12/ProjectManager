import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  constructor(private fb: FormBuilder) {this.createForm(); }
  angFormAddUser: FormGroup;
  error: any = { isError: false, errorMessage: '' };
  ngOnInit() {
  }

  createForm() {
    this.angFormAddUser = this.fb.group({
      txt_first_name: ['', Validators.required],
      txt_last_name: [''],
      txt_emp_id:['',''],
      txt_search: ['']

    });
  }


}
