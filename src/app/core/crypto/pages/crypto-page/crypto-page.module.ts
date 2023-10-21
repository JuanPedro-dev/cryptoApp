import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CryptoPageRoutingModule } from './crypto-page-routing.module';
import { CryptoPageComponent } from './crypto-page.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';


@NgModule({
  declarations: [
    CryptoPageComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    CryptoPageRoutingModule
  ]
})
export class CryptoPageModule { }
