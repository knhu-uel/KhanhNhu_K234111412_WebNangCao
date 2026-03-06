import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-ex60-61',
  standalone: false,
  templateUrl: './ex60-61.html',
  styleUrl: './ex60-61.css',
})
export class Eex6061 {
  result: string = '';
  cookiesList: any = null;
  loading = false;
  lastAction = '';

  constructor(private http: HttpClient) {}

  private call(url: string, label: string): void {
    this.loading = true;
    this.lastAction = label;
    this.result = '';
    this.cookiesList = null;

    this.http.get(url, { responseType: 'text', withCredentials: true }).subscribe({
      next: (data) => {
        this.loading = false;
        // Try to parse as JSON for read-cookie display
        try {
          this.cookiesList = JSON.parse(data);
        } catch {
          this.result = data;
        }
      },
      error: () => {
        this.loading = false;
        this.result = '⚠️ Lỗi kết nối. Hãy khởi động my-server-mongodb (port 3002).';
      },
    });
  }

  createCookie(): void {
    this.call('/create-cookie', 'Tạo Cookies');
  }

  readCookie(): void {
    this.loading = true;
    this.lastAction = 'Đọc Cookies';
    this.result = '';
    this.cookiesList = null;

    this.http.get('/read-cookie', { responseType: 'text', withCredentials: true }).subscribe({
      next: (data) => {
        this.loading = false;
        this.result = data; // HTML string with <br/>
      },
      error: () => {
        this.loading = false;
        this.result = '⚠️ Lỗi kết nối. Hãy khởi động my-server-mongodb (port 3002).';
      },
    });
  }

  readCookieJson(): void {
    this.loading = true;
    this.lastAction = 'Đọc Cookies (JSON Object)';
    this.result = '';
    this.cookiesList = null;

    this.http.get<any>('/read-cookie-json', { withCredentials: true }).subscribe({
      next: (data) => {
        this.loading = false;
        this.cookiesList = data;
      },
      error: () => {
        this.loading = false;
        // fallback to read-cookie text
        this.readCookie();
      },
    });
  }

  createLimitedCookie(): void {
    this.call('/create-limited-cookie', 'Tạo Cookies có thời hạn');
  }

  clearCookie(): void {
    this.call('/clear-cookie', 'Xóa Cookie [account]');
  }

  get cookiesArray(): { key: string; value: any }[] {
    if (!this.cookiesList) return [];
    return Object.entries(this.cookiesList).map(([key, value]) => ({ key, value }));
  }

  stringify(v: any): string {
    if (typeof v === 'object') return JSON.stringify(v, null, 2);
    return String(v);
  }
}
