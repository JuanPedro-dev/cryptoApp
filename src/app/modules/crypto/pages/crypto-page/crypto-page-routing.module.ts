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
        redirectTo: 'price',
        pathMatch: 'full',
      },
      {
        path: 'price',
        loadChildren: () =>
          import('../../components/price/price.module').then(
            (m) => m.PriceModule
          ),
      },
      {
        path: 'converter',
        loadChildren: () =>
          import('../../components/converter/converter.module').then(
            (m) => m.ConverterModule
          ),
      },
      {
        path: 'trending',
        loadChildren: () =>
          import('../../components/trending/trending.module').then(
            (m) => m.TrendingModule
          ),
      },
      {
        path: 'news',
        loadChildren: () =>
          import('../../components/news/news.module').then((m) => m.NewsModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CryptoPageRoutingModule {}
