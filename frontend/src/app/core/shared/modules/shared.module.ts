import { MatFormFieldModule } from '@angular/material/form-field';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { createTranslateLoader } from 'src/app/app.module';
import { HttpClient } from '@angular/common/http';
import { ErrorMessageModule } from '@shared/components/error-message/error-message.module';

//import { CountriesDialogModule } from '@shared/dialog/countries-dialog/countries-dialog.module';
// import { CountriesDialogModule } from '@shared/dialog/countries-dialog/countries-dialog.module';
// import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    // TranslateModule,
  ],
  exports: [
    FormsModule,
    // TranslateModule,
    TranslateModule,
    ErrorMessageModule,
    // MatDialogModule,
    MatFormFieldModule,
    // CountriesDialogModule,
  ]
})
export class SharedModule { }
