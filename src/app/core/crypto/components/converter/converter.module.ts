import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConverterRoutingModule } from './converter-routing.module';
import { ConverterComponent } from './converter.component';


@NgModule({
  declarations: [
    ConverterComponent
  ],
  imports: [
    CommonModule,
    ConverterRoutingModule
  ]
})
export class ConverterModule { }
