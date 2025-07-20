import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { TransactioneditService} from './transactionedit.service'
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {FormsModule} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-transactionedit',
  templateUrl: './transactionedit.component.html',
  styleUrls: ['./transactionedit.component.css']
})
export class TransactioneditComponent {

  form: FormGroup;
  selected:any;
  transaction_id:any;

  constructor(
      private transactioneditService:TransactioneditService,
      private fb: FormBuilder,
      private router: Router,
      private activatedRoute: ActivatedRoute,
      private dialog: MatDialog
    ){
      this.form = this.fb.group({
        type: [1],
        description: ['teste'],
        amount: [10.00]
      }) 
      this.selected = "rec";
      this.transaction_id = null;
    }

    ngOnInit(): void {

      this.activatedRoute.queryParams.subscribe(params => {
        this.transaction_id = params['transaction_id'];
      });

      this.form =this.fb.group({
        type: new FormControl('', Validators.required),
        description: new FormControl('', Validators.required),
        amount: new FormControl('', Validators.required)
      });
      this.getTransaction(this.transaction_id)

    }

    getTransaction(id:number):any{

      this.transactioneditService.getTransactionsById(id).subscribe(
        (res)=>{
          if(res.status===1){
            if(res.data.type=='receita'){
              this.selected = 1
            }else{
              this.selected = 2;
            }
          
          this.form.setValue({
            type: res.data.type,
            description: res.data.description,
            amount: res.data.amount
          })
          }else{
            this.openDialog();
          }

        },
        (error) => {
          console.error('Error getting transactions:', error);
        });
    }
    
    onSubmit(): void {
      if (this.form.valid) {
        let id = this.transaction_id;
        let data = {
          "type":this.form.value.type,
          "description":this.form.value.description,
          "amount":this.form.value.amount
        }
        this.transactioneditService.alterTransactions(data, id).subscribe(
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
  styleUrls: ['./transactionedit.component.css'],
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatIconModule],
})
export class DialogMessageError {}