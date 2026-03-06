import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Fashion } from '../fashion.model';
import { Ex58FashionService } from '../ex-58-fashion.service';

@Component({
  selector: 'app-ex-58-admin-detail',
  standalone: false,
  templateUrl: './ex-58-admin-detail.html',
  styleUrl: './ex-58-admin-detail.css',
})
export class Ex58AdminDetail implements OnInit {
  mode: 'view' | 'edit' | 'create' = 'view';
  fashion: Fashion = {
    fashion_title: '',
    fashion_details: '',
    thumbnail: '',
    fashion_style: '',
  };
  safeDetails: SafeHtml = '';
  styles: string[] = ['Street Style', 'Trends', 'Casual'];
  loading = true;
  saving = false;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: Ex58FashionService,
    private sanitizer: DomSanitizer,
  ) {}

  ngOnInit(): void {
    const path = this.route.snapshot.routeConfig?.path || '';
    const id = this.route.snapshot.paramMap.get('id');

    if (path.startsWith('ex-58-admin-create')) {
      this.mode = 'create';
      this.loading = false;
    } else if (path.startsWith('ex-58-admin-edit')) {
      this.mode = 'edit';
      this.loadFashion(id!);
    } else {
      this.mode = 'view';
      this.loadFashion(id!);
    }

    this.service.getStyles().subscribe({ next: (s) => (this.styles = s), error: () => {} });
  }

  loadFashion(id: string): void {
    this.service.getFashionById(id).subscribe({
      next: (data) => {
        this.fashion = data;
        this.safeDetails = this.sanitizer.bypassSecurityTrustHtml(
          data.fashion_details || '',
        );
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Không thể tải dữ liệu.';
        this.loading = false;
      },
    });
  }

  // WYSIWYG helpers
  insertHtml(html: string): void {
    this.fashion.fashion_details = (this.fashion.fashion_details || '') + html;
  }

  wrapSelection(tagOpen: string, tagClose: string): void {
    this.fashion.fashion_details =
      (this.fashion.fashion_details || '') + tagOpen + tagClose;
  }

  save(): void {
    if (!this.fashion.fashion_title || !this.fashion.fashion_style) {
      this.errorMessage = 'Vui lòng nhập Tiêu đề và Style!';
      return;
    }
    this.saving = true;
    this.errorMessage = '';

    if (this.mode === 'create') {
      this.service.createFashion(this.fashion).subscribe({
        next: () => {
          this.saving = false;
          this.router.navigate(['/ex-58-admin']);
        },
        error: () => {
          this.saving = false;
          this.errorMessage = 'Lỗi khi tạo mới!';
        },
      });
    } else {
      this.service.updateFashion(this.fashion._id!, this.fashion).subscribe({
        next: () => {
          this.saving = false;
          this.router.navigate(['/ex-58-admin']);
        },
        error: () => {
          this.saving = false;
          this.errorMessage = 'Lỗi khi cập nhật!';
        },
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/ex-58-admin']);
  }

  formatDate(date: any): string {
    if (!date) return '';
    return new Date(date).toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  }
}
