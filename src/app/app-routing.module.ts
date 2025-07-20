import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupUpComponent } from    './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { TransactionaddComponent } from './components/transactionadd/transactionadd.component';
import { TransactioneditComponent } from './components/transactionedit/transactionedit.component';

const routes: Routes = [
  {path:"", redirectTo:"login", pathMatch:"full"},
  {path:"login", component:LoginComponent},
  {path:"signUp", component:SignupUpComponent},
  {path:"home", component:HomeComponent},
  {path:"transactionAdd", component:TransactionaddComponent},
  {path:"transactionEdit", component:TransactioneditComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
