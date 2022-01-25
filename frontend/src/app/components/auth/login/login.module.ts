import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { SharedModule } from '@shared/modules/shared.module';
import { MyFormModule } from '@shared/components/my-form/my-form.module';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
  CommonModule,
    LoginRoutingModule,
    SharedModule,
    MyFormModule,
    // MatDialogModule,
  ]
})
export class LoginModule { }
