import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagerComponent } from './manager.component';
import { adminGuard } from 'src/app/guards/admin.guard';

const routes: Routes = [
  {
    path: '',
    component: ManagerComponent,
    children:[
      {
        path: '',
        redirectTo:'profile',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadChildren: () => import('../components/user-dashboard/user-manager.module').then(m=> m.UserManagerModule),
        canActivate: [adminGuard]
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('../components/user-profile/user.module').then(m=> m.UserModule),
      },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagerRoutingModule {}
