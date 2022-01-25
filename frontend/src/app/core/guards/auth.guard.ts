import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { FacadeService } from '../services/facade.service';
import { LocalStorage } from '@constants/local-storage';
import { Routes } from '@constants/routes';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(public facadeService: FacadeService,
              private router: Router,
              private translateService: TranslateService,
    ) {

    }

  canActivate(): boolean {
    if (this.facadeService.authService.isAuthenticated) {
      return true;
    }
    localStorage.removeItem(LocalStorage.USER);

    const msg = this.translateService.instant(`Please Sign in First`);
    window.open(Routes.LOGIN, '_blank');
    this.facadeService.snackbarService.error(msg);
    return false;
  }
}
