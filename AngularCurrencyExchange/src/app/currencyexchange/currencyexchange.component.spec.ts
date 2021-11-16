import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyexchangeComponent } from './currencyexchange.component';

describe('CurrencyexchangeComponent', () => {
  let component: CurrencyexchangeComponent;
  let fixture: ComponentFixture<CurrencyexchangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrencyexchangeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyexchangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
