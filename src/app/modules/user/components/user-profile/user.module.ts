import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { CryptoPageModule } from '@modules/crypto/pages/crypto-page/crypto-page.module';


@NgModule({
  declarations: [
    UserComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    CryptoPageModule
  ]
})
export class UserModule { }
