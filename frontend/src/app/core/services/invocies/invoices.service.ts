import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Invoice } from '@models/invoice/invoice.model';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { Results } from '@models/search/result.model';
import { Pagination } from './../../models/search/pagination.model';

@Injectable({
  providedIn: 'root'
})
export class InvoicesService {

  readonly baseUrl = environment.apiUrl + 'Invoices/';

  constructor(private httpClient: HttpClient) { }

  get(id: number): Observable<Invoice> {
    return this.httpClient.get<Invoice>(this.baseUrl + id);
  }

  list(): Observable<Invoice[]> {
    return this.httpClient.get<Invoice[]>(this.baseUrl);
  }

  listByPagination(body: Pagination): Observable<Results<Invoice>> {
    return this.httpClient.post<Results<Invoice>>(this.baseUrl + 'GetAllByPagination', body);
  }

  create(body: Invoice): Observable<Invoice> {
    return this.httpClient.post<Invoice>(this.baseUrl, body);
  }

  update(body: Invoice): Observable<Invoice> {
    return this.httpClient.put<Invoice>(this.baseUrl, body);
  }

  delete(id: number): Observable<Invoice> {
    return this.httpClient.delete<Invoice>(this.baseUrl + id);
  }

}
