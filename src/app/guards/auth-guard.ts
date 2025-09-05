import { CanActivateFn, Router } from '@angular/router';
import { AuthServices } from '../services/auth-services';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const user=inject(AuthServices).user.value;
  return user?.token ? true: inject(Router).createUrlTree(['/signin']);
};
