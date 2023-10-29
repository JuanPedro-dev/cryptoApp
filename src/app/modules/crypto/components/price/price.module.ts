import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PriceComponent } from './price.component';
import { PriceRoutingModule } from './price.routing';
import { MaterialModule } from '@shared/components/material/material.module';


@NgModule({
  declarations: [PriceComponent],
  imports: [
    CommonModule, 
    PriceRoutingModule, 
    MaterialModule
  ],
})
export class PriceModule {}
