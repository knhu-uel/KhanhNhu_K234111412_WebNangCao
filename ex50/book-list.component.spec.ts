import { TestBed } from '@angular/core/testing';

import { BookListComponent } from './book-list.component';

describe('BookListComponent', () => {
  let component: BookListComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookListComponent]
    });
    component = TestBed.createComponent(BookListComponent).componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
