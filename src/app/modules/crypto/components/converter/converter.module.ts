import { NgModule } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';

import { ConverterRoutingModule } from './converter-routing.module';
import { ConverterComponent } from './converter.component';
import { MaterialModule } from '@shared/components/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ConverterComponent
  ],
  imports: [
    CommonModule,
    ConverterRoutingModule,
    FormsModule,
    MaterialModule,
    NgIf,
    ReactiveFormsModule,
  ]
})
export class ConverterModule { }
