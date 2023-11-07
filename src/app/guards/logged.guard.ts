import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const loggedGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);

  if(sessionStorage.getItem('tokenAuthCrypto') == null) return true;

  router.navigate(['', '/home']); 
  return false;
};
