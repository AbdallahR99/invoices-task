import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { User } from '@models/user/user.model';
import { Results } from '@models/search/result.model';
import { Pagination } from './../../models/search/pagination.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly baseUrl = environment.apiUrl + 'Users/';

  constructor(private httpClient: HttpClient) { }

  get(id: number): Observable<User> {
    return this.httpClient.get<User>(this.baseUrl + id);
  }

  list(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.baseUrl);
  }

  listByPagination(body: Pagination): Observable<Results<User>> {
    return this.httpClient.post<Results<User>>(this.baseUrl + 'GetAllByPagination', body);
  }

  create(body: User): Observable<User> {
    return this.httpClient.post<User>(this.baseUrl, body);
  }

  update(body: User): Observable<User> {
    return this.httpClient.put<User>(this.baseUrl, body);
  }

  delete(id: number): Observable<User> {
    return this.httpClient.delete<User>(this.baseUrl + id);
  }
}
