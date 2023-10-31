import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignInRoutingModule } from './sign-in-routing.module';
import { SignInComponent } from './sign-in.component';

import { SharedModule } from '@shared/shared.module';

import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@shared/components/material/material.module';


@NgModule({
  declarations: [
    SignInComponent,
  ],
  imports: [
    CommonModule,
    SignInRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
  ]
})
export class SignInModule { }
