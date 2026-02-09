import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from './book.service';
import { IBook } from './book.interface';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit {
  book: IBook = {
    id: 0,
    tenSach: '',
    giaban: 0,
    mota: '',
    tacgia: '',
    anhbia: '',
    ngayXuatBan: '',
    soTrang: 0,
    soluongton: 0,
    maCd: 0,
    maNxb: 0
  };
  
  isEditMode = false;
  loading = false;

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEditMode = true;
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

  onSubmit(): void {
    if (this.validateForm()) {
      if (this.isEditMode) {
        this.updateBook();
      } else {
        this.createBook();
      }
    }
  }

  validateForm(): boolean {
    if (!this.book.tenSach || this.book.tenSach.trim() === '') {
      alert('Vui lòng nhập tên sách!');
      return false;
    }
    if (!this.book.tacgia || this.book.tacgia.trim() === '') {
      alert('Vui lòng nhập tác giả!');
      return false;
    }
    if (this.book.giaban <= 0) {
      alert('Giá bán phải lớn hơn 0!');
      return false;
    }
    return true;
  }

  createBook(): void {
    this.loading = true;
    this.bookService.createBook(this.book).subscribe({
      next: () => {
        alert('Thêm sách thành công!');
        this.router.navigate(['/ex50']);
      },
      error: (error) => {
        console.error('Error creating book:', error);
        alert('Có lỗi xảy ra khi thêm sách!');
        this.loading = false;
      }
    });
  }

  updateBook(): void {
    this.loading = true;
    this.bookService.updateBook(this.book.id, this.book).subscribe({
      next: () => {
        alert('Cập nhật sách thành công!');
        this.router.navigate(['/ex50']);
      },
      error: (error) => {
        console.error('Error updating book:', error);
        alert('Có lỗi xảy ra khi cập nhật sách!');
        this.loading = false;
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/ex50']);
  }
}
