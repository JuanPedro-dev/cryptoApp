import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignUpRoutingModule } from './sign-up-routing.module';
import { SignUpComponent } from './sign-up.component';

import { ReactiveFormsModule } from '@angular/forms'; 
import { SharedModule } from '@shared/shared.module';
import { MaterialModule } from '@shared/components/material/material.module';

@NgModule({
  declarations: [
    SignUpComponent
  ],
  imports: [
    CommonModule,
    SignUpRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
  ]
})
export class SignUpModule { }
