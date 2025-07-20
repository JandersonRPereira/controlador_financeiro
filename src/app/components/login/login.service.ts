import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../interfaces/IUser';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

    private url = 'http://controle-contas-pessoais-backend.test/api';

  constructor(private http: HttpClient) { }

  login(user: any): Observable<any> {
    return this.http.post<any>(`${this.url}/login`, user);
  }
  
}
