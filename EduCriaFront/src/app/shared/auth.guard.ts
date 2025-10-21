import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';  

export const AuthGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('token');

  if (token) {
    return true;
  } else {
    const router = inject(Router);
    router.navigate(['/login']);
    return false;
  }
};
