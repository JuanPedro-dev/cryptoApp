import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CryptocurrencyRoutingModule } from './cryptocurrency-routing.module';
import { CryptocurrencyComponent } from './cryptocurrency.component';


@NgModule({
  declarations: [
    CryptocurrencyComponent
  ],
  imports: [
    CommonModule,
    CryptocurrencyRoutingModule
  ]
})
export class CryptocurrencyModule { }
