import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PriceComponent } from './price.component';
import { PriceRoutingModule } from './price.routing';

@NgModule({
  declarations: [PriceComponent],
  imports: [CommonModule, PriceRoutingModule],
})
export class PriceModule {}
