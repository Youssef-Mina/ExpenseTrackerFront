import { CanActivateChildFn, Router } from '@angular/router';
import { AuthServices } from '../services/auth-services';
import { inject } from '@angular/core';

export const authChildGuard: CanActivateChildFn = (childRoute, state) => {
  const user=inject(AuthServices).user.value;
  return user?.token ? true: inject(Router).createUrlTree(['signin']);
};
