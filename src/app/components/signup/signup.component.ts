import { Component, OnInit, signal } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SignupService } from './signup.service';
import { IUser } from '../interfaces/IUser';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupUpComponent implements OnInit {
  [x: string]: any;

  public users: IUser[] = [];
  public userForm: FormGroup;
  
  constructor(
    private fb: FormBuilder,
    private signupService: SignupService,
    private router: Router
  ){
   this.userForm = this.fb.group({
      name: [''],
      email: [''],
      password: ['']
    })
  }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      name: ['teste 2', Validators.required],
      email: ['', , [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(){

  }

  signUp(){
    let data:any = this.userForm.value
    
    this.signupService.createUser(data).subscribe(
       (res)=>{
          document.cookie = "auth=1";
          document.cookie = "user_id="+res["data"].id;
          this.router.navigate(["home"]);
       },
       (error) => {
          console.error('Error creating user:', error);
        }
    );
  }


}


