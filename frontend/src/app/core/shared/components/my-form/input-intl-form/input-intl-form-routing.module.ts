import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InputIntlFormComponent } from './input-intl-form.component';

const routes: Routes = [{ path: '', component: InputIntlFormComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InputIntlFormRoutingModule { }
