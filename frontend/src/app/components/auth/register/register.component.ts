import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '@models/user/user.model';
import { FacadeService } from '@services/facade.service';
import { LocalStorage } from '@constants/local-storage';
import { Router } from '@angular/router';
import { Routes } from '@constants/routes';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  host: {'class': 'd-flex h-100 align-items-center justify-content-center'},

})
export class RegisterComponent implements OnInit {
  user: User = new User();
  isSubmitting = false;

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
    this.facadeService.authService.register(this.user).toPromise().then(user => {
      this.isSubmitting = false;
      localStorage.setItem(LocalStorage.USER, JSON.stringify(user));
      this.router.navigate([Routes.MAIN]);

    },
    error => {
      this.isSubmitting = false;
      this.facadeService.snackbarService.error(error?.error?.message ?? 'Error');
      console.error(error);
    });
  }
}
