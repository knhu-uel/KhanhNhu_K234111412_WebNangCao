import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ex10 } from './ex10';

describe('Ex10', () => {
  let component: Ex10;
  let fixture: ComponentFixture<Ex10>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Ex10]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ex10);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
