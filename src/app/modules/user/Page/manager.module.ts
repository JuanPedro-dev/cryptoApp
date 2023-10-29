import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagerRoutingModule } from './manager-routing.module';
import { ManagerComponent } from './manager.component';

import { MaterialModule } from '../../../shared/components/material/material.module';
import { CryptoPageModule } from '@modules/crypto/pages/crypto-page/crypto-page.module';


@NgModule({
  declarations: [
    ManagerComponent,

  ],
  imports: [
    CommonModule,
    ManagerRoutingModule,
    MaterialModule,
    CryptoPageModule
  ]
})
export class ManagerModule { }
