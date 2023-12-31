import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../modules/User';
import { HttpResponse } from '../modules/HttpResponse';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'https://reqres.in/api/users';

  constructor(private http: HttpClient) {}

  getUsers(page: number = 1): Observable<HttpResponse> {
    const url = `${this.apiUrl}?page=${page}`;
    return this.http.get<HttpResponse>(url);
  }

  deleteUser(user: User | undefined): Observable<User> {
    const url = `${this.apiUrl}/${user?.id}`;
    return this.http.delete<User>(url);
  }

  updateUser(
    id: number | undefined,
    name: string | null | undefined,
    job: string | null | undefined
  ): Observable<User> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<User>(url, { name, job });
  }

  addUser(
    name: string | null | undefined,
    job: string | null | undefined
  ): Observable<any> {
    return this.http.post<any>(this.apiUrl, { name, job });
  }

  getUserFullName(user: User | undefined): string {
    return `${user?.first_name} ${user?.last_name}`;
  }
}
