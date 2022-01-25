import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfirmEmailRoutingModule } from './confirm-email-routing.module';
import { ConfirmEmailComponent } from './confirm-email.component';
import { SharedModule } from '@shared/modules/shared.module';


@NgModule({
  declarations: [
    ConfirmEmailComponent
  ],
  imports: [
  CommonModule,
    ConfirmEmailRoutingModule,
    SharedModule,
  ]
})
export class ConfirmEmailModule { }
