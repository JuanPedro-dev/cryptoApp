import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CryptoPageRoutingModule } from './crypto-page-routing.module';
import { CryptoPageComponent } from './crypto-page.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [
    CryptoPageComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    CryptoPageRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatTableModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatSortModule,
    MatMenuModule,
  ]
})
export class CryptoPageModule { }
