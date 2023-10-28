import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from '@modules/landing/components/landing-page/landing-page.component';

const routes: Routes = [
  {
    path: 'home',
    component: LandingPageComponent,
    loadChildren: () =>
    import('./modules/landing/landing.module').then(m => m.LandingModule),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'crypto',
    loadChildren: () =>
      import('./modules/crypto/crypto.module').then(m => m.CryptoModule),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '**',
    loadChildren: () =>
      import('./modules/not-found/not-found.module').then(
        (m) => m.NotFoundModule
    ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
