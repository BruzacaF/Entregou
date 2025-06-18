import {inject} from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { DatabaseService } from '../services/database.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(DatabaseService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  } else {
    router.navigate(['']);
    return false;
  }
};