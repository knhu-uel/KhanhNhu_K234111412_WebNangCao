import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from './book.service';
import { IBook } from './book.interface';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  book: IBook | null = null;
  loading = false;

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.loadBook(+id);
    }
  }

  loadBook(id: number): void {
    this.loading = true;
    this.bookService.getBookById(id).subscribe({
      next: (data) => {
        this.book = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading book:', error);
        this.loading = false;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/ex50']);
  }

  editBook(): void {
    if (this.book) {
      this.router.navigate(['/ex50/edit', this.book.id]);
    }
  }
}
