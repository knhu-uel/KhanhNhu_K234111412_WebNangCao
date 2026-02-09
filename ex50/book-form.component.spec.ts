import { TestBed } from '@angular/core/testing';

import { BookFormComponent } from './book-form.component';

describe('BookFormComponent', () => {
  let component: BookFormComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookFormComponent]
    });
    component = TestBed.createComponent(BookFormComponent).componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
