import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotFoundRoutingModule } from './not-found-routing.module';
import { NotFoundComponent } from './not-found.component';
import { NavBarComponent } from '@shared/components/nav-bar/nav-bar.component';
import { SharedModule } from '@shared/shared.module';
import { MaterialModule } from '@shared/components/material/material.module';


@NgModule({
  declarations: [
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    NotFoundRoutingModule,
    SharedModule,
    MaterialModule
  ]
})
export class NotFoundModule { }
