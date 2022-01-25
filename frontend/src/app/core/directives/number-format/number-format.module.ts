import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumberFormatDirective } from './number-format.directive';



@NgModule({
  declarations: [
    NumberFormatDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NumberFormatDirective
  ],
})
export class NumberFormatModule { }
