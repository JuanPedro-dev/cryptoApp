import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthModule } from './core/auth/auth.module';
import { CryptoModule } from './core/crypto/crypto.module';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  {
    path: 'home',
    loadChildren: () =>
      import('./core/home-page/home-page.module').then((m) => m.HomePageModule),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./core/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'crypto',
    loadChildren: () =>
      import('./core/crypto/crypto.module').then((m) => m.CryptoModule),
  },
  {
    path: '**',
    loadChildren: () =>
      import('./core/not-found/not-found.module').then((m) => m.NotFoundModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
