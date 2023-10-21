import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CryptocurrencyComponent } from './cryptocurrency.component';

const routes: Routes = [{ path: '', component: CryptocurrencyComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CryptocurrencyRoutingModule { }
