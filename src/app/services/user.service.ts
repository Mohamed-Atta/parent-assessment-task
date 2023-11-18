import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../modules/User'
import { HttpResponse } from '../modules/HttpResponse'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'https://reqres.in/api/users';

  constructor(private http: HttpClient) {}

  getUsers(page: number = 1): Observable<HttpResponse> {
    const url = `${this.apiUrl}?page=${page}`
    return this.http.get<HttpResponse>(url);
  }

  deleteUser(user: User): Observable<User> {
    const url = `${this.apiUrl}/${user.id}`;
    return this.http.delete<User>(url);
  }

  updateUser(user: User): Observable<User> {
    const url = `${this.apiUrl}/${user.id}`;
    return this.http.put<User>(url, user);
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  getUserFullName(user: User): string {
    return `${user.first_name} ${user.last_name}`;
  }
}
