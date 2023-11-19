import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://reqres.in/api';

  private _isAuthenticated$ = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this._isAuthenticated$.asObservable();

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('token');
    this._isAuthenticated$.next(!!token);
  }

  login(email: string, password: string) {
    const url = `${this.apiUrl}/login`;

    return this.http.post(url, { email, password }).pipe(
      tap((response: any) => {
        this._isAuthenticated$.next(true);
        localStorage.setItem('token', response.token);
      })
    );
  }

  logout() {
    this._isAuthenticated$.next(false);
    localStorage.removeItem('token');
  }

  isUserAuthenticated(): boolean {
    return Boolean(localStorage.getItem('token'))
  }
}
