import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { SharedModule } from '@shared/modules/shared.module';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatPaginatorIntlCro } from '@utils/mat-paginator-intl/mat-paginator-intl';
import { ExportAsModule } from 'ngx-export-as';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MyFormModule } from '@shared/components/my-form/my-form.module';
import { UserFormComponent } from './user-form/user-form.component';
import {MatMenuModule} from '@angular/material/menu';


@NgModule({
  declarations: [
    MainComponent,
    UserFormComponent
  ],
  imports: [
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
    MatMenuModule
  ],
  providers: [
    { provide: MatPaginatorIntl, useClass: MatPaginatorIntlCro},
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
  ],
})
export class MainModule { }

