import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css'],
  standalone: false
})
export class CustomerListComponent implements OnInit {
  customerGroups: any[] = [];

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    this.customerService.getCustomerGroups().subscribe(
      (data) => {
        this.customerGroups = data;
      }
    );
  }
}
