import { Component, ElementRef, Input, OnInit, Self, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl, Validators } from '@angular/forms';

@Component({
  selector: 'input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.scss'],
  host: {'class': 'd-block'},

})
export class InputFormComponent implements OnInit, ControlValueAccessor {

  @ViewChild('input', {static: true}) input!: ElementRef<HTMLInputElement>;
  @Input() value: any;
  @Input() type = 'text';
  @Input() label!: string;
  @Input() placeholder!: string;
  @Input() name!: string;
  @Input() showError = true;
  @Input() showCounter = false;
  @Input() required: boolean = false;
  @Input() minlength!: number;
  @Input() maxlength!: number;
  @Input() min!: number;
  @Input() max!: number;
  @Input() pattern!: string;
  @Input() patternHint!: string;
  @Input() disabled = false;
  get isNumber(): boolean {
    return this.type === 'number';
  }
  get control(): FormControl {
    return this.controlDir.control as FormControl;
  }
  constructor(@Self() public controlDir: NgControl) {
    this.controlDir.valueAccessor = this;
  }

  ngOnInit(): void {
    const control = this.controlDir.control;
    const validators = control?.validator ? [control.validator] : [];
    const asyncValidators = control?.asyncValidator ? [control.asyncValidator] : [];
    if (this.value) {
      this.control.setValue(this.value);
    }
    if (this.required === true) validators.push(Validators.required);
    if (this.minlength) validators.push(Validators.minLength(this.minlength));
    if (this.maxlength) validators.push(Validators.maxLength(this.maxlength));
    if (this.min) validators.push(Validators.min(this.min));
    if (this.max) validators.push(Validators.max(this.max));
    if (this.pattern) validators.push(Validators.pattern(this.pattern));

    control?.setValidators(validators);
    control?.setAsyncValidators(asyncValidators);
    control?.updateValueAndValidity();

    // // console.log(this);
    // // console.log(this.controlDir);

    // // console.log(control);
    // // console.log(validators);

  }

  onChange(event: any): void {}

  onTouched(): void {}

  writeValue(obj: any): void {
    this.input.nativeElement.value = obj || '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

}
