import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Injectable()
export class isAdminGuard implements CanActivate{
    constructor(private _authService: AuthService, private _router: Router) {
    }

    canActivate(): boolean {
        if (!this._authService.IsAdmin){
            this._router.navigate(['/welcome']);
        }
        return this._authService.IsAdmin;
    }
}