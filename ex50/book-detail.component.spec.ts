import { TestBed } from '@angular/core/testing';

import { BookDetailComponent } from './book-detail.component';

describe('BookDetailComponent', () => {
  let component: BookDetailComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookDetailComponent]
    });
    component = TestBed.createComponent(BookDetailComponent).componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
