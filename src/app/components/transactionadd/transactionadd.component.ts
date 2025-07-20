import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { TransactionaddService} from './transactionadd.service'
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {FormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-transactionadd',
  templateUrl: './transactionadd.component.html',
  styleUrls: ['./transactionadd.component.css']
})
export class TransactionaddComponent implements OnInit {

  form: FormGroup;
  user_id:number;

  constructor(
    private transactionaddService:TransactionaddService,
    private fb: FormBuilder,
    private router: Router,
    private dialog: MatDialog
  ){
    this.form = this.fb.group({
      type: [''],
      description: [''],
      amount: ['']
    }) 
    this.user_id = NaN;
  }

  ngOnInit(): void {
    this.form =this.fb.group({
      type: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      amount: new FormControl('', Validators.required)
    });
    const value = Object.fromEntries(document.cookie.split('; ').map(v=>v.split(/=(.*)/s).map(decodeURIComponent)));
    this.user_id = value.user_id;
  }

  onSubmit(): void {
    if (this.form.valid) {
      console.log('Form submitted:', this.form.value.description);
      let data = {
        "user_id":this.user_id,
        "type":this.form.value.type,
        "description":this.form.value.description,
        "amount":this.form.value.amount
      }
      this.transactionaddService.createTransactions(data).subscribe(
       (res)=>{
        if(res.status===1){
          this.router.navigate(["home"]);
        }else{
          this.openDialog();
        }

       },
       (error) => {
          console.error('Error getting transactions:', error);
        });
    }
  }

  openDialog() {
    this.dialog.open(DialogMessageError);
  }

  cancel(){
    this.router.navigate(["home"]);
  }

  logout(){
    document.cookie = "auth=";
    document.cookie = "user_id=";
    this.router.navigate(["login"]);
  }
}

@Component({
  selector: 'dialog-message-error',
  templateUrl: 'dialog-message-error.html',
  styleUrls: ['./transactionadd.component.css'],
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatIconModule],
})
export class DialogMessageError {}