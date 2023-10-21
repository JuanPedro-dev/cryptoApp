import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CryptoPageComponent } from './crypto-page.component';

describe('CryptoPageComponent', () => {
  let component: CryptoPageComponent;
  let fixture: ComponentFixture<CryptoPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CryptoPageComponent]
    });
    fixture = TestBed.createComponent(CryptoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
