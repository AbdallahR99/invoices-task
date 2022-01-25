import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { NumberFormatModule } from '@directives/number-format/number-format.module';
import { SharedModule } from '@shared/modules/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputFormComponent } from './input-form/input-form.component';
import { SelectFormComponent } from './select-form/select-form.component';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { InputIntlFormComponent } from './input-intl-form/input-intl-form.component';

import {ScrollingModule} from '@angular/cdk/scrolling';
import { IntlDialogComponent } from './input-intl-form/intl-dialog/intl-dialog.component';
import {MatListModule} from '@angular/material/list';
import { FilterModule } from '@pipes/filter.module';
// import { FilterPipe } from '@pipes/filter/filter.pipe';

@NgModule({
  declarations: [
    InputFormComponent,
    SelectFormComponent,
    InputIntlFormComponent,
    IntlDialogComponent,
  ],
  imports: [
  CommonModule,
    SharedModule,
    MatSelectModule,
    NumberFormatModule,
    ReactiveFormsModule,
    MatMenuModule,
    ScrollingModule,
    MatDialogModule,
    MatListModule,
    MatProgressSpinnerModule,
    FilterModule,

  ],

  exports: [
    InputFormComponent,
    SelectFormComponent,
    InputIntlFormComponent,
    MatDialogModule
    ],
})
export class MyFormModule { }
