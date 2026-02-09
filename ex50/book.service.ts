import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IBook } from './book.interface';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = 'http://localhost:3000/api/books';

  constructor(private http: HttpClient) { }

  // Get all books
  getAllBooks(): Observable<IBook[]> {
    return this.http.get<IBook[]>(this.apiUrl);
  }

  // Get book by id
  getBookById(id: number): Observable<IBook> {
    return this.http.get<IBook>(`${this.apiUrl}/${id}`);
  }

  // Create new book
  createBook(book: IBook): Observable<IBook> {
    return this.http.post<IBook>(this.apiUrl, book);
  }

  // Update book
  updateBook(id: number, book: IBook): Observable<IBook> {
    return this.http.put<IBook>(`${this.apiUrl}/${id}`, book);
  }

  // Delete book
  deleteBook(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
