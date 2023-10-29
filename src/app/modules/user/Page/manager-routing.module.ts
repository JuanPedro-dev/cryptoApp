import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagerComponent } from './manager.component';

const routes: Routes = [
  {
    path: '',
    component: ManagerComponent,
    children:[
      {
        path: '',
        redirectTo:'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('../components/user-dashboard/user-manager.module').then(m=> m.UserManagerModule),
      },
      {
        path: 'edit',
        loadChildren: () =>
          import('../components/user-profile/user.module').then(m=> m.UserModule),
      },
      {
        path: 'view',
        loadChildren: () =>
          import('../components/user-dashboard/user-manager.module').then(m=> m.UserManagerModule),
      },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagerRoutingModule {}
