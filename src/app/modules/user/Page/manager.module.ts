import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagerRoutingModule } from './manager-routing.module';
import { ManagerComponent } from './manager.component';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { MaterialModule } from '../../../shared/components/material/material.module';


@NgModule({
  declarations: [
    ManagerComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    ManagerRoutingModule,
    MaterialModule
  ]
})
export class ManagerModule { }
