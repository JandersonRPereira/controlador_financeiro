import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { HomeService } from './home.service';
import { Router } from '@angular/router';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import { MatTableDataSource, MatTableModule} from '@angular/material/table';
import { FormGroup, FormControl } from '@angular/forms';
import { formatDate } from '@angular/common';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit  {

  transactions:any;
  displayedColumns: string[] = ['type', 'description', 'amount', 'transaction_date', 'options'];
  dataSource = new MatTableDataSource<any>();
  receitas:number;
  despesas:number;
  total:number;
  selected:any;
  typeTransaction:string;
  user_id:number;
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  @ViewChild('type_transac') type_transac!: ElementRef;

  constructor(
      private homeService: HomeService,
      private router: Router,
      private dialog: MatDialog,
    ){
      this.dataSource = this.transactions
      this.receitas = 0;
      this.despesas = 0;
      this.total = 0;
      this.selected = "";
      this.typeTransaction = ''
      this.user_id = 0;
    }
  
    ngOnInit(): void {
      
      // Busca o Cookie auth
      const value = Object.fromEntries(document.cookie.split('; ').map(v=>v.split(/=(.*)/s).map(decodeURIComponent)));
      
      if(value.auth !=='1'){
        document.cookie = "auth=";
        this.router.navigate(["login"]);
      }
      this.user_id = value.user_id;
      this.getTransactions(this.user_id);
    }

    getTransactions(user_id:number):any{

      this.homeService.getTransactions(user_id).subscribe(
       (res)=>{
        if(res.status===1){
          this.transactions = res.data;
          this.dataSource = this.transactions
          this.receitas = res.data_index.receitas
          this.despesas = res.data_index.despesas
          this.total = res.data_index.total

        }else{
          alert('No Transactions!');
        }

       },
       (error) => {
          console.error('Error getting transactions:', error);
        });
    }

    addTransaction(){
       this.router.navigate(["transactionAdd"]);
    }
    
    alterTransaction(id:number){
      console.log("id", id)
       this.router.navigate(["transactionEdit"],{queryParams:{transaction_id:id}});
    }

    deleteTransaction(id:number){
      if(window.confirm('Are sure you want to delete this item ?')){
        this.homeService.deleteTransactions(id).subscribe(
        (res)=>{
          if(res.status===1){
            this.getTransactions(this.user_id);
          }else{
            alert('No Transactions!');
          }

        },
        (error) => {
            console.error('Error getting transactions:', error);
        });
        this.router.navigate(["home"]);
      }

    }

    onSelected():void {
      this.typeTransaction = this.type_transac.nativeElement.value;
      let type = (this.type_transac.nativeElement.value=='receita')?1:2;
      this.homeService.getTransactionsType(this.user_id, type).subscribe(
       (res)=>{
        if(res.status===1){
          console.log("res type", res.data)
          this.dataSource = res.data;
        }else{
          alert('No Transactions!');
        }

       },
       (error) => {
          console.error('Error getting transactions:', error);
      });
    }

    searchForDate(){

      let start:any = this.range.controls.start.value;
      let end:any = this.range.controls.end.value;
      let startFormated = formatDate(start, 'yyyy-MM-dd', 'en-US');
      let endFormated = formatDate(end, 'yyyy-MM-dd', 'en-US');

      let type = (this.type_transac.nativeElement.value=='receita')?1:2;
      this.homeService.getTransactionsRange(this.user_id, startFormated, endFormated).subscribe(
       (res)=>{
        if(res.status===1){
          console.log("res type", res.data)
          this.dataSource = res.data;
        }else{
          alert('No Transactions!');
        }

       },
       (error) => {
          console.error('Error getting transactions:', error);
      });

    }

    logoff(){
      document.cookie = "auth=";
      this.router.navigate(["login"])
    }

}