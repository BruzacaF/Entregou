import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { DatabaseService } from '../services/database.service';

export const roleGuard: CanActivateFn = (route, state) => {
    const authService = inject(DatabaseService);
    const router = inject(Router);

    const userRole = authService.getRole();
    const routesRoleRequired = route.data['role'];

    if (routesRoleRequired.includes(userRole)) {
        return true;
    }
    else {
        router.navigate(['']);
        return false;
    }
};