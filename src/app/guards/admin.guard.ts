import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);

  if(sessionStorage.getItem('tokenAuthCrypto') == 'admin@gmail.com') return true

  return false;
};
