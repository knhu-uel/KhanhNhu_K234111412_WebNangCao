import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Fashion } from '../fashion.model';
import { Ex58FashionService } from '../ex-58-fashion.service';

@Component({
  selector: 'app-ex-58-client-detail',
  standalone: false,
  templateUrl: './ex-58-client-detail.html',
  styleUrl: './ex-58-client-detail.css',
})
export class Ex58ClientDetail implements OnInit {
  fashion: Fashion = {
    fashion_title: '',
    fashion_details: '',
    thumbnail: '',
    fashion_style: '',
  };
  safeDetails: SafeHtml = '';
  loading = true;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: Ex58FashionService,
    private sanitizer: DomSanitizer,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) this.loadFashion(id);
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

  goBack(): void {
    this.router.navigate(['/ex-58-client']);
  }

  formatDate(date: any): string {
    if (!date) return '';
    return new Date(date).toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  }
}
