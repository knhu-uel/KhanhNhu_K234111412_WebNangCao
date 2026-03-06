import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-ex62',
  standalone: false,
  templateUrl: './ex62.html',
  styleUrl: './ex62.css',
})
export class Ex62Session {
  response: string = '';
  loading = false;
  visitCount = 0;
  isFirstVisit = false;
  history: string[] = [];

  constructor(private http: HttpClient) {}

  visit(): void {
    this.loading = true;
    this.http
      .get('/contact', { responseType: 'text', withCredentials: true })
      .subscribe({
        next: (res) => {
          this.response = res;
          this.history.unshift(res);
          if (this.history.length > 8) this.history.pop();
          const match = res.match(/(\d+) times?/);
          if (match) {
            this.visitCount = parseInt(match[1]);
            this.isFirstVisit = false;
          } else {
            this.visitCount = 1;
            this.isFirstVisit = true;
          }
          this.loading = false;
        },
        error: () => {
          this.response =
            '⚠️ Lỗi kết nối. Hãy khởi động my-server-mongodb (port 3002).';
          this.loading = false;
        },
      });
  }
}
