import { SharedModule } from '@shared/modules/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ErrorMessageRoutingModule } from './error-message-routing.module';
import { ErrorMessageComponent } from './error-message.component';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    ErrorMessageComponent
  ],
  imports: [
    CommonModule,
    ErrorMessageRoutingModule,
    TranslateModule,
  ],
  exports: [
    ErrorMessageComponent,
  ]
})
export class ErrorMessageModule { }
