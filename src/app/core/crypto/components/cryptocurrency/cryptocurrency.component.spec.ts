import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CryptocurrencyComponent } from './cryptocurrency.component';

describe('CryptocurrencyComponent', () => {
  let component: CryptocurrencyComponent;
  let fixture: ComponentFixture<CryptocurrencyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CryptocurrencyComponent]
    });
    fixture = TestBed.createComponent(CryptocurrencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
