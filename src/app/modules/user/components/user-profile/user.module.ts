import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { CryptoPageModule } from '@modules/crypto/pages/crypto-page/crypto-page.module';
import { MaterialModule } from '../../../../shared/components/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    UserComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    CryptoPageModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class UserModule { }
