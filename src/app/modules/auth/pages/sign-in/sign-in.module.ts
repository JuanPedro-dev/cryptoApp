import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignInRoutingModule } from './sign-in-routing.module';
import { SignInComponent } from './sign-in.component';


import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    SignInComponent
  ],
  imports: [
    CommonModule,
    SignInRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule, MatInputModule, MatIconModule, MatSnackBarModule, MatButtonModule,
  ]
})
export class SignInModule { }
