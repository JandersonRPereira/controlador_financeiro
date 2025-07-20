import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../interfaces/IUser';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SignupService {

  private url = 'http://controle-contas-pessoais-backend.test/api';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${this.url}/users`);
  }
  
  getUserById(id: number): Observable<IUser> {
    return this.http.get<IUser>(`${this.url}/users/${id}`);
  }

  createUser(user: any): Observable<any> {
    return this.http.post<any>(`${this.url}/users`, user);
  }

  alterUser(user: IUser, id: number): Observable<IUser> {
    return this.http.put<IUser>(`${this.url}/users/${id}`, user);
  }

  deleteUser(id: number): Observable<IUser> {
    return this.http.delete<IUser>(`${this.url}/users/${id}`);
  }

}
