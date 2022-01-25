
import { Injectable, Injector } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { DialogService } from './dialog/dialog.service';
import { InvoicesService } from './invocies/invoices.service';
import { RouterLoaderService } from './routing/router-loader.service';
import { SnackbarService } from './snackbar/snackbar.service';

import { TranslatorService } from './translate/translator.service';
import { UserService } from './user/user.service';


@Injectable({
  providedIn: 'root'
})
export class FacadeService {

  // helpers
  private _translatorService!: TranslatorService;
  private _routerLoaderService!: RouterLoaderService;
  private _dialogService!: DialogService;
  private _userService!: UserService;
  private _invoicesService!: InvoicesService;
  private _authService!: AuthService;
  private _snackBarService!: SnackbarService;

  constructor(private inject: Injector) { }

  /**
   * snackbar service
   *
   *
   */
   public get snackbarService(): SnackbarService {
    if (!this._snackBarService) {
      this._snackBarService = this.inject.get(SnackbarService);
    }
    return this._snackBarService;
  }

  /**
   *
   * @service translator
   */
  public get translatorService(): TranslatorService {
    if (!this._translatorService) {
      return this._translatorService = this.inject.get(TranslatorService);
    }
    return this._translatorService;
  }

  /**
   *
   * @service routerLoader
   */
  public get routerLoaderService(): RouterLoaderService {
    if (!this._routerLoaderService) {
      return this._routerLoaderService = this.inject.get(RouterLoaderService);
    }
    return this._routerLoaderService;
  }

   /**
   * dialog service
   *
   *
   */
    public get dialogService(): DialogService {
      if (!this._dialogService) {
        this._dialogService = this.inject.get(DialogService);
      }
      return this._dialogService;
    }


  /**
   * user service
   *
   *
   */
    public get userService(): UserService {
      if (!this._userService) {
        this._userService = this.inject.get(UserService);
      }
      return this._userService;
    }

  /**
   * invoice service
   *
   *
   */
    public get invoicesService(): InvoicesService {
      if (!this._invoicesService) {
        this._invoicesService = this.inject.get(InvoicesService);
      }
      return this._invoicesService;
    }

    /**
   * auth service
   *
   *
   */
    public get authService(): AuthService {
      if (!this._authService) {
        this._authService = this.inject.get(AuthService);
      }
      return this._authService;
    }

}


