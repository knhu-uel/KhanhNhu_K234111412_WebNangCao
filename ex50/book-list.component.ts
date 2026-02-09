import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from './book.service';
import { IBook } from './book.interface';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books: IBook[] = [];
  loading = false;

  constructor(
    private bookService: BookService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.loading = true;
    this.bookService.getAllBooks().subscribe({
      next: (data) => {
        this.books = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading books:', error);
        this.loading = false;
      }
    });
  }

  viewDetails(id: number): void {
    this.router.navigate(['/ex50/details', id]);
  }

  editBook(id: number): void {
    this.router.navigate(['/ex50/edit', id]);
  }

  createNew(): void {
    this.router.navigate(['/ex50/create']);
  }

  deleteBook(id: number, tenSach: string): void {
    if (confirm(`Bạn có chắc chắn muốn xóa sách "${tenSach}" không?`)) {
      this.bookService.deleteBook(id).subscribe({
        next: () => {
          alert('Xóa sách thành công!');
          this.loadBooks();
        },
        error: (error) => {
          console.error('Error deleting book:', error);
          alert('Có lỗi xảy ra khi xóa sách!');
        }
      });
    }
  }
}
