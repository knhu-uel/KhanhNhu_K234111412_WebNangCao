import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  category: string;
  quantity: number;
}

@Component({
  selector: 'app-ex63-cart-new',
  standalone: false,
  templateUrl: './ex63-cart.html',
  styleUrl: './ex63-cart.css',
})
export class Ex63CartNew implements OnInit {
  cart: CartItem[] = [];
  total = 0;
  selectedIds: Set<string> = new Set();
  loading = false;
  message = '';
  msgType: 'success' | 'error' | '' = '';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.http.get<any>('/ex63/cart', { withCredentials: true }).subscribe({
      next: (res) => {
        this.cart = res.cart || [];
        this.total = res.total || 0;
      },
      error: () => {},
    });
  }

  toggleSelect(id: string): void {
    if (this.selectedIds.has(id)) this.selectedIds.delete(id);
    else this.selectedIds.add(id);
  }

  isSelected(id: string): boolean {
    return this.selectedIds.has(id);
  }

  updateCart(): void {
    // Remove selected items first
    const removeQueue = [...this.selectedIds];
    const doRemoves = removeQueue.reduce<Promise<void>>(
      (acc, id) =>
        acc.then(
          () =>
            new Promise((resolve) => {
              this.http
                .delete(`/ex63/cart/remove/${id}`, { withCredentials: true })
                .subscribe({ next: () => resolve(), error: () => resolve() });
            }),
        ),
      Promise.resolve(),
    );

    // Then update quantities
    doRemoves.then(() => {
      const updateQueue = this.cart
        .filter((i) => !this.selectedIds.has(i.productId))
        .map(
          (item) =>
            new Promise<void>((resolve) => {
              this.http
                .put(
                  '/ex63/cart/update',
                  { productId: item.productId, quantity: item.quantity },
                  { withCredentials: true },
                )
                .subscribe({ next: () => resolve(), error: () => resolve() });
            }),
        );

      Promise.all(updateQueue).then(() => {
        this.selectedIds.clear();
        this.loadCart();
        this.message = 'Đã cập nhật giỏ hàng!';
        this.msgType = 'success';
        setTimeout(() => (this.message = ''), 2500);
      });
    });
  }

  continueShopping(): void {
    this.router.navigate(['/ex63-product-list-new']);
  }

  formatPrice(price: number): string {
    return '$' + (price / 23000).toFixed(2);
  }

  itemTotal(item: CartItem): string {
    return '$' + ((item.price * item.quantity) / 23000).toFixed(2);
  }

  get grandTotal(): string {
    return '$' + (this.total / 23000).toFixed(2);
  }
}
