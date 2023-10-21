import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PriceComponent } from './price.component';

const routes: Routes = [
  {
    path: '',
    component: PriceComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PriceRoutingModule {}
