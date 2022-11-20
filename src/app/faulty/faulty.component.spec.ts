import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaultyComponent } from './faulty.component';

describe('FaultyComponent', () => {
  let component: FaultyComponent;
  let fixture: ComponentFixture<FaultyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FaultyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FaultyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
