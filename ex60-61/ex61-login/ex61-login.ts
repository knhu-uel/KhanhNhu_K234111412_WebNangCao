import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-ex61-login',
  standalone: false,
  templateUrl: './ex61-login.html',
  styleUrl: './ex61-login.css',
})
export class Eex61Login implements OnInit {
  username: string = '';
  password: string = '';
  loading = false;
  loginStatus: 'idle' | 'success' | 'error' = 'idle';
  message: string = '';
  loggedInUser: string = '';
  cookieLoaded = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Đọc cookie từ server khi mở trang — tự động điền vào form
    this.http
      .get<any>('/auth/read-login-cookie', { withCredentials: true })
      .subscribe({
        next: (data) => {
          if (data.username) {
            this.username = data.username;
            this.password = data.password || '';
            this.loggedInUser = data.username;
            this.cookieLoaded = true;
            this.loginStatus = 'success';
            this.message = `Đã tìm thấy cookie đăng nhập của "${data.username}". Form được điền tự động!`;
          }
        },
        error: () => {
          // Không có cookie — bình thường, không cần xử lý
        },
      });
  }

  login(): void {
    if (!this.username.trim() || !this.password.trim()) {
      this.loginStatus = 'error';
      this.message = 'Vui lòng nhập đầy đủ User Name và Password!';
      return;
    }
    this.loading = true;
    this.loginStatus = 'idle';
    this.message = '';

    this.http
      .post<any>(
        '/auth/login',
        { username: this.username, password: this.password },
        { withCredentials: true },
      )
      .subscribe({
        next: (res) => {
          this.loading = false;
          if (res.success) {
            this.loginStatus = 'success';
            this.loggedInUser = res.username;
            this.message = `Đăng nhập thành công! Cookie đã được lưu cho "${res.username}". Lần sau mở lại trang, form sẽ tự điền.`;
          } else {
            this.loginStatus = 'error';
            this.message = res.message || 'Đăng nhập thất bại!';
          }
        },
        error: (err) => {
          this.loading = false;
          this.loginStatus = 'error';
          if (err.status === 401) {
            this.message = 'Sai tài khoản hoặc mật khẩu. Vui lòng thử lại!';
          } else {
            this.message = '⚠️ Lỗi kết nối. Hãy khởi động my-server-mongodb (port 3002).';
          }
        },
      });
  }

  logout(): void {
    this.http
      .get('/auth/clear-login-cookie', { responseType: 'text', withCredentials: true })
      .subscribe({
        next: () => {
          this.username = '';
          this.password = '';
          this.loggedInUser = '';
          this.cookieLoaded = false;
          this.loginStatus = 'idle';
          this.message = 'Đã xóa cookie đăng nhập. Form đã được reset.';
        },
        error: () => {
          this.message = '⚠️ Lỗi khi xóa cookie.';
        },
      });
  }
}
