import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingRoutingModule } from './landing-routing.module';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { SharedModule } from "../../shared/shared.module";
import { CryptoCardComponent } from './components/crypto-card/crypto-card.component';


@NgModule({
    declarations: [
        LandingPageComponent,
    ],
    imports: [
        LandingRoutingModule,
        SharedModule
    ]
})
export class LandingModule { }
