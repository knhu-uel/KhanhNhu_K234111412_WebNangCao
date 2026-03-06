import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Fashion } from './fashion.model';

@Injectable({
  providedIn: 'root',
})
export class Ex58FashionService {
  private apiUrl = '/ex-58-fashions';

  constructor(private http: HttpClient) {}

  getAllFashions(style?: string): Observable<Fashion[]> {
    let params = new HttpParams();
    if (style) params = params.set('style', style);
    return this.http.get<Fashion[]>(this.apiUrl, { params });
  }

  getStyles(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/styles`);
  }

  getFashionById(id: string): Observable<Fashion> {
    return this.http.get<Fashion>(`${this.apiUrl}/${id}`);
  }

  createFashion(fashion: Fashion): Observable<Fashion> {
    return this.http.post<Fashion>(this.apiUrl, fashion);
  }

  updateFashion(id: string, fashion: Fashion): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, fashion);
  }

  deleteFashion(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
