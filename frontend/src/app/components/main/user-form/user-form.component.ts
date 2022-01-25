import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '@models/user/user.model';
import { FacadeService } from '@services/facade.service';

@Component({
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  user: User = new User();
  isEdit = false;
  isSubmitting = false;
  constructor(@Inject(MAT_DIALOG_DATA) data: User,
  private dialogRef: MatDialogRef<UserFormComponent>,
  private facadeService: FacadeService) {
    if (data) {
      this.user = data;
      this.isEdit = true;
    }
  }

  ngOnInit(): void {
  }

  // close(): void {
  //   this.dialogRef.close();
  // }
  showError(form: NgForm): boolean {
    return form.submitted && !this.isSubmitting;
  }
  submit(form: NgForm): void {
    if (form.invalid) return;
    this.isSubmitting = true;
    if (this.isEdit) {
      this.facadeService.userService.update(this.user).toPromise().then(user => {
        this.isSubmitting = false;
        this.facadeService.snackbarService.success('Done');
        this.dialogRef.close(user);
      },
      error => {
        this.isSubmitting = false;
        this.facadeService.snackbarService.error(error?.error?.message ?? 'Error');
        console.error(error);
      });
    } else {
      this.facadeService.userService.create(this.user).toPromise().then(user => {
        this.isSubmitting = false;
        this.facadeService.snackbarService.success('Done');
        this.dialogRef.close(user);
      },
      error => {
        this.isSubmitting = false;
        this.facadeService.snackbarService.error(error?.error?.message ?? 'Error');
        console.error(error);
      });
    }
  }
}
