import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

export interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  stock: number;
  image: string;
  description: string;
}

@Component({
  selector: 'app-ex63-product-list-new',
  standalone: false,
  templateUrl: './ex63-product-list.html',
  styleUrl: './ex63-product-list.css',
})
export class Ex63ProductListNew implements OnInit {
  products: Product[] = [];
  cartCount = 0;
  addedId: string = '';
  loading = false;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadCartCount();
  }

  loadProducts(): void {
    this.http.get<Product[]>('/ex63/products', { withCredentials: true }).subscribe({
      next: (data) => (this.products = data),
      error: () => {},
    });
  }

  loadCartCount(): void {
    this.http.get<any>('/ex63/cart', { withCredentials: true }).subscribe({
      next: (res) => (this.cartCount = Array.isArray(res.cart) ? res.cart.length : 0),
      error: () => {},
    });
  }

  addToCart(product: Product): void {
    this.loading = true;
    this.http
      .post<any>('/ex63/cart/add', { productId: product._id, quantity: 1 }, { withCredentials: true })
      .subscribe({
        next: (res) => {
          this.cartCount = Array.isArray(res.cart) ? res.cart.length : 0;
          this.addedId = product._id;
          this.loading = false;
          setTimeout(() => (this.addedId = ''), 1500);
        },
        error: () => { this.loading = false; },
      });
  }

  goToCart(): void {
    this.router.navigate(['/ex63-cart-new']);
  }

  formatPrice(price: number): string {
    return '$' + (price / 23000).toFixed(2);
  }
}
