import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoicesRoutingModule } from './invoices-routing.module';
import { InvoicesComponent } from './invoices.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from '@shared/modules/shared.module';
import { MainRoutingModule } from '@components/main/main-routing.module';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MyFormModule } from '@shared/components/my-form/my-form.module';
import { ExportAsModule } from 'ngx-export-as';
import { MatPaginatorIntlCro } from '@utils/mat-paginator-intl/mat-paginator-intl';
import { InvoiceFormComponent } from './invoice-form/invoice-form.component';
import { MatMenuModule } from '@angular/material/menu';
import { NumberFormatModule } from '@directives/number-format/number-format.module';
import { MAT_SELECT_SCROLL_STRATEGY, MAT_SELECT_SCROLL_STRATEGY_PROVIDER } from '@angular/material/select';


@NgModule({
  declarations: [
    InvoicesComponent,
    InvoiceFormComponent,
  ],
  imports: [
  CommonModule,
    InvoicesRoutingModule,
    CommonModule,
    MainRoutingModule,
    SharedModule,
    MatTableModule,
    MatPaginatorModule,
    ExportAsModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatButtonModule,
    MyFormModule,
    MatMenuModule,
    NumberFormatModule,
  ],
  providers: [
    // { provide: MAT_SELECT_SCROLL_STRATEGY, useValue: MAT_SELECT_SCROLL_STRATEGY_PROVIDER },
    { provide: MatPaginatorIntl, useClass: MatPaginatorIntlCro},
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
  ],
})
export class InvoicesModule { }
