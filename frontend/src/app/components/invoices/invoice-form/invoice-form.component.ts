import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Invoice } from '@models/invoice/invoice.model';
import { NgForm } from '@angular/forms';
import { FacadeService } from '@services/facade.service';
import { User } from '@models/user/user.model';
import { MAT_SELECT_SCROLL_STRATEGY_PROVIDER } from '@angular/material/select';

@Component({
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.scss'],
  providers: [
    MAT_SELECT_SCROLL_STRATEGY_PROVIDER
  ]
})
export class InvoiceFormComponent implements OnInit {
  invoice: Invoice = {
    ID: 0,
    UserID: this.facadeService.authService.user?.ID!,
  };
  isEdit = false;
  isSubmitting = false;
  // users!: User[];
  // isUsersLoading = true;
  // isUsersError = false;
  constructor(@Inject(MAT_DIALOG_DATA) data: Invoice,
  private dialogRef: MatDialogRef<InvoiceFormComponent>,
  private facadeService: FacadeService) {
    if (data) {
      this.invoice = data;
      this.isEdit = true;
    }
  }

  ngOnInit(): void {
    // this.getUser();
  }

  // getUser(): void {
  //   this.facadeService.userService.list().toPromise().then(users => {
  //     if (users) {
  //     this.users = users;
  //     }
  //     this.isUsersLoading = false;
  //   },
  //   error => {
  //     this.isUsersError = true;
  //     console.log(error);

  //   }
  //   );
  // }

  showError(form: NgForm): boolean {
    return form.submitted && !this.isSubmitting;
  }
  // close(): void {
  //   this.dialogRef.close();
  // }

  submit(form: NgForm): void {
    if (form.invalid) return;
    this.isSubmitting = true;
    if (this.isEdit) {
      this.facadeService.invoicesService.update(this.invoice).toPromise().then(invoice => {
        this.isSubmitting = false;
        this.facadeService.snackbarService.success('Done');
        this.dialogRef.close(this.invoice);
      },
      error => {
        this.isSubmitting = false;
        this.facadeService.snackbarService.error(error?.error?.message ?? 'Error');
        console.error(error);
      });
    } else {
      this.facadeService.invoicesService.create(this.invoice).toPromise().then(invoice => {
        this.isSubmitting = false;
        this.facadeService.snackbarService.success('Done');
        this.dialogRef.close(this.invoice);
      },
      error => {
        this.isSubmitting = false;
        this.facadeService.snackbarService.error(error?.error?.message ?? 'Error');
        console.error(error);
      });
    }
  }
}
