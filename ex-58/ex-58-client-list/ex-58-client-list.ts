import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Fashion } from '../fashion.model';
import { Ex58FashionService } from '../ex-58-fashion.service';

@Component({
  selector: 'app-ex-58-client-list',
  standalone: false,
  templateUrl: './ex-58-client-list.html',
  styleUrl: './ex-58-client-list.css',
})
export class Ex58ClientList implements OnInit {
  groupedFashions: { style: string; items: Fashion[] }[] = [];
  styles: string[] = [];
  selectedStyle: string = '';
  searchStyle: string = '';
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

  onDropdownChange(): void {
    this.searchStyle = this.selectedStyle;
    this.loadFashions(this.selectedStyle || undefined);
  }

  onSearch(): void {
    this.selectedStyle = '';
    this.loadFashions(this.searchStyle.trim() || undefined);
  }

  clearFilter(): void {
    this.selectedStyle = '';
    this.searchStyle = '';
    this.loadFashions();
  }

  viewDetail(id: string): void {
    this.router.navigate(['/ex-58-client-detail', id]);
  }
}
