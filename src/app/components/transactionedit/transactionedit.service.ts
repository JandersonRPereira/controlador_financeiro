import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ITransaction } from '../interfaces/ITransaction';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactioneditService {

  private url = 'http://controle-contas-pessoais-backend.test/api';

  constructor(private http: HttpClient) { }

  getTransactionsById(id: number): Observable<any> {
    return this.http.get<any>(`${this.url}/transactions/${id}`);
  }

  alterTransactions(transaction: any, id: number): Observable<any> {
    return this.http.put<any>(`${this.url}/transactions/${id}`, transaction);
  }

}
