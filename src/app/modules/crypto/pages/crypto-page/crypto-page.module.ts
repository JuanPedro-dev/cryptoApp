import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CryptoPageRoutingModule } from './crypto-page-routing.module';
import { CryptoPageComponent } from './crypto-page.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';

import { MaterialModule } from '@shared/components/material/material.module';

@NgModule({
  declarations: [
    CryptoPageComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    CryptoPageRoutingModule,
    MaterialModule
  ],
  exports: [
    NavbarComponent
  ]
})
export class CryptoPageModule { }
