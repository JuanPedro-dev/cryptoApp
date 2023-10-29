import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingRoutingModule } from './landing-routing.module';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { SharedModule } from "../../shared/shared.module";
import { CryptoCardComponent } from './components/crypto-card/crypto-card.component';
import { MaterialModule } from '@shared/components/material/material.module';
import { FormsModule } from '@angular/forms';


@NgModule({
    declarations: [
        LandingPageComponent,
        CryptoCardComponent
    ],
    imports: [
        CommonModule,
        LandingRoutingModule,
        SharedModule,
        MaterialModule,
        FormsModule
    ]
})
export class LandingModule { }
