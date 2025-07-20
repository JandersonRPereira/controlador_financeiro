import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private url = 'http://controle-contas-pessoais-backend.test/api';

  constructor(private http: HttpClient) { }

  getTransactions(id: number): Observable<any> {
    return this.http.get<any>(`${this.url}/transactionsUser/${id}`);
  }
  
  getTransactionsType(id: number, type:number): Observable<any> {
    return this.http.get<any>(`${this.url}/transactionsType/${id}/${type}`);
  }

  getTransactionsRange(id: number, start:string, end:string): Observable<any> {
    return this.http.get<any>(`${this.url}/transactionsRange/${id}/${start}/${end}`);
  }
  
   getTransactionsById(id: number): Observable<any> {
    return this.http.get<any>(`${this.url}/transactions/${id}`);
  }

  createTransactions(transaction: any): Observable<any> {
    return this.http.post<any>(`${this.url}/transactions`, transaction);
  }

  alterTransactions(transaction: any, id: number): Observable<any> {
    return this.http.put<any>(`${this.url}/transactions/${id}`, transaction);
  }

  deleteTransactions(id: number): Observable<any> {
    return this.http.delete<any>(`${this.url}/transactions/${id}`);
  }
}
