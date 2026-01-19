import { Component } from '@angular/core';
import { CatalogService } from '../catalog.service';

@Component({
  selector: 'app-catalog-list',
  templateUrl: './catalog-list.component.html',
  styleUrls: ['./catalog-list.component.css'],
  standalone: false
})
export class CatalogListComponent {
  public categories: any

  constructor(catalogService: CatalogService) {
    this.categories = catalogService.getCategories()
  }
}
