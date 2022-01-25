import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { User } from '@models/user/user.model';
import { Observable } from 'rxjs/internal/Observable';
import { Routes } from '@constants/routes';
import { Router } from '@angular/router';
import { LocalStorage } from '@constants/local-storage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly baseUrl = environment.apiUrl + 'Users/';

  constructor(private httpClient: HttpClient, private router: Router) { }

  register(body: User): Observable<User> {
    return this.httpClient.post<User>(this.baseUrl, body);
  }

  login(body: User): Observable<User> {
    return this.httpClient.post<User>(this.baseUrl + 'Login', body);
  }

  logOut(): void {
    localStorage.clear();
    this.router.navigateByUrl(Routes.MAIN);
  }

  get user(): User | undefined {
    return JSON.parse(localStorage.getItem(LocalStorage.USER)!) as User;
  }

  get isAuthenticated(): boolean {
    return localStorage.getItem(LocalStorage.USER) !== null;
  }

  get isAdmin(): boolean {
    return (JSON.parse(localStorage.getItem(LocalStorage.USER)!) as User)?.IsAdmin ?? false;
  }
}
