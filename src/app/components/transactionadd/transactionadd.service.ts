import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ITransaction } from '../interfaces/ITransaction';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionaddService {

    private url = 'http://controle-contas-pessoais-backend.test/api';

  constructor(private http: HttpClient) { }

  createTransactions(transaction: any): Observable<any> {
    return this.http.post<any>(`${this.url}/transactions`, transaction);
  }
  
}
