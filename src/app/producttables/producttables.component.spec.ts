import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProducttablesComponent } from './producttables.component';

describe('ProducttablesComponent', () => {
  let component: ProducttablesComponent;
  let fixture: ComponentFixture<ProducttablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProducttablesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProducttablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
