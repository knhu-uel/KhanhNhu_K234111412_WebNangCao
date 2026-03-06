import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Fashion } from '../fashion.model';
import { Ex58FashionService } from '../ex-58-fashion.service';

@Component({
  selector: 'app-ex-58-admin-list',
  standalone: false,
  templateUrl: './ex-58-admin-list.html',
  styleUrl: './ex-58-admin-list.css',
})
export class Ex58AdminList implements OnInit {
  allFashions: Fashion[] = [];
  groupedFashions: { style: string; items: Fashion[] }[] = [];
  styles: string[] = [];
  selectedStyle: string = '';
  loading = true;
  errorMessage = '';

  constructor(
    private service: Ex58FashionService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadStyles();
    this.loadFashions();
  }

  loadStyles(): void {
    this.service.getStyles().subscribe({
      next: (s) => (this.styles = s),
      error: () => {},
    });
  }

  loadFashions(style?: string): void {
    this.loading = true;
    this.errorMessage = '';
    this.service.getAllFashions(style).subscribe({
      next: (data) => {
        this.allFashions = data;
        this.groupByStyle(data);
        this.loading = false;
      },
      error: () => {
        this.errorMessage =
          'Không thể tải dữ liệu. Hãy khởi động server-fashion (port 4000).';
        this.loading = false;
      },
    });
  }

  groupByStyle(fashions: Fashion[]): void {
    const map = new Map<string, Fashion[]>();
    fashions.forEach((f) => {
      if (!map.has(f.fashion_style)) map.set(f.fashion_style, []);
      map.get(f.fashion_style)!.push(f);
    });
    this.groupedFashions = Array.from(map.entries()).map(([style, items]) => ({
      style,
      items,
    }));
  }

  onStyleChange(): void {
    this.loadFashions(this.selectedStyle || undefined);
  }

  clearFilter(): void {
    this.selectedStyle = '';
    this.loadFashions();
  }

  viewDetail(id: string): void {
    this.router.navigate(['/ex-58-admin-detail', id]);
  }

  editFashion(id: string): void {
    this.router.navigate(['/ex-58-admin-edit', id]);
  }

  deleteFashion(id: string, title: string): void {
    if (!confirm(`Bạn có chắc muốn xóa "${title}" không?`)) return;
    const activeStyle = this.selectedStyle || undefined;
    this.service.deleteFashion(id).subscribe({
      next: () => this.loadFashions(activeStyle),
      error: () => alert('Xóa thất bại!'),
    });
  }

  addNew(): void {
    this.router.navigate(['/ex-58-admin-create']);
  }

  gotoClient(): void {
    this.router.navigate(['/ex-58-client']);
  }

  formatDate(date: any): string {
    if (!date) return '';
    return new Date(date).toLocaleDateString('vi-VN');
  }
}
