import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserManagerRoutingModule } from './user-manager-routing.module';
import { UserManagerComponent } from './user-manager.component';
import { MaterialModule } from '@shared/components/material/material.module';


@NgModule({
  declarations: [
    UserManagerComponent,
  ],
  imports: [
    CommonModule,
    UserManagerRoutingModule,
    MaterialModule,
  ]
})
export class UserManagerModule { }
