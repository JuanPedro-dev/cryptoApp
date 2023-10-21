import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CryptoPageComponent } from './crypto-page.component';

const routes: Routes = [
  {
    path: '',
    component: CryptoPageComponent,
    children: [
      {
        path: '',
        redirectTo: 'cryptocurrency',
        pathMatch: 'full'
      },
      {
        path: 'cryptocurrency',
        loadChildren: () =>
          import('../../components/cryptocurrency/cryptocurrency.module').then(
            (m) => m.CryptocurrencyModule
          ),
      },
      { path: 'converter', loadChildren: () => import('../../components/converter/converter.module').then(m => m.ConverterModule) },
      { path: 'trending', loadChildren: () => import('../../components/trending/trending.module').then(m => m.TrendingModule) },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CryptoPageRoutingModule {}
