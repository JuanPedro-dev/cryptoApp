import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import { MaterialModule } from './components/material/material.module';


@NgModule({
  declarations: [
    NavBarComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports:[
    NavBarComponent,
    FooterComponent
  ]
})
export class SharedModule { }
