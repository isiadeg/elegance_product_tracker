import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductmovementComponent } from './productmovement.component';

describe('ProductmovementComponent', () => {
  let component: ProductmovementComponent;
  let fixture: ComponentFixture<ProductmovementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductmovementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductmovementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
