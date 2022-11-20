import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductfaultsComponent } from './productfaults.component';

describe('ProductfaultsComponent', () => {
  let component: ProductfaultsComponent;
  let fixture: ComponentFixture<ProductfaultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductfaultsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductfaultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
