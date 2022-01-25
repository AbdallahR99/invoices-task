import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserType } from '@constants/user-type';
import { User } from '@models/user/user.model';
import { FacadeService } from '@services/facade.service';
import { Router } from '@angular/router';
import { LocalStorage } from '@constants/local-storage';
import { Routes } from '@constants/routes';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  host: {'class': 'd-flex h-100 align-items-center justify-content-center'},
})
export class LoginComponent implements OnInit {
  isSubmitting = false;
  user: User = {
    ID: 0,
    IsAdmin: false,
  }
  userTypes: {typeName: string, value: boolean}[] = [
    {
      typeName: 'Admin',
      value:true,
    },
    {
      typeName: 'User',
      value: false,
    },
  ];

  get userTypeEnum(): typeof UserType {
    return UserType;
  }

  constructor(private facadeService: FacadeService, private router: Router) { }

  ngOnInit(): void {
  }

  showError(form: NgForm): boolean {
    return form.submitted && !this.isSubmitting;
  }

  submit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isSubmitting = true;
    this.facadeService.authService.login(this.user).toPromise().then(user => {
      this.isSubmitting = false;
      localStorage.setItem(LocalStorage.USER, JSON.stringify(user));
      this.facadeService.snackbarService.success('Login Success');
      this.router.navigate([Routes.MAIN]);
    },
    error => {
      this.isSubmitting = false;
      this.facadeService.snackbarService.error(error?.error?.message ?? 'Error');
      console.error(error);
    });
  }

}
