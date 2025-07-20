import { Component, OnInit, signal } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { IUser } from '../interfaces/IUser';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public users: IUser[] = [];
  public userForm: FormGroup;
  
  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private dialog: MatDialog
  ){
   this.userForm = this.fb.group({
      email: [''],
      password: ['']
    })
  }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      emaill: ['', , [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

  }

  openDialog() {
    this.dialog.open(DialogElementsExampleDialog);
  }

  login(){
    let data:any = this.userForm.value
    
    this.loginService.login(data).subscribe(
       (res)=>{
         if(res.status === 0){
          this.openDialog();
        }
        
        document.cookie = "auth=1";
        document.cookie = "user_id="+res.data.id;
        this.router.navigate(["home"]);
        
       },
       (error) => {
          alert('Error logging in:');
          this.userForm = this.fb.group({
            email: [''],
            password: ['']
          })
        }
    );
  }

  logout(){
    document.cookie = "auth=";
    document.cookie = "user_id=";
    this.router.navigate(["login"]);
  }

}

@Component({
  selector: 'dialog-invalid-pass',
  templateUrl: 'dialog-invalid-pass.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatIconModule],
})
export class DialogElementsExampleDialog {}