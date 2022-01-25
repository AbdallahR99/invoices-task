import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Self, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl, Validators } from '@angular/forms';
import { MatSelect, MatSelectChange } from '@angular/material/select';
import { FacadeService } from '@services/facade.service';

@Component({
  selector: 'select-form',
  templateUrl: './select-form.component.html',
  styleUrls: [
    './select-form.component.scss',
    './../../../../../../assets/scss/custom-mat-select.scss'
  ],
})
export class SelectFormComponent implements OnInit, ControlValueAccessor {

  @ViewChild(MatSelect) input!: MatSelect;
  @Output() selectionChange: EventEmitter<MatSelectChange> = new EventEmitter<MatSelectChange>();
  @Output() valueChange: EventEmitter<any> = new EventEmitter<any>();
  @Input() initValue: any;
  @Input() type = 'text';
  @Input() label!: string;
  @Input() placeholder!: string;
  @Input() name!: string;
  @Input() showImg = false;
  @Input() showError = true;
  @Input() imgPath!: string;
  @Input() imgName!: string;
  @Input() items!: any[];
  @Input() isError = false;
  @Input() isLoading = true;
  @Input() queryProp!: string;
  @Input() queryPropFallBack!: string;
  @Input() optionLabelProp!: string;
  @Input() optionLabelPropEn!: string;
  @Input() optionValueProp!: string;
  @Input() required!: boolean;
  @Input() disabled = false;
  query = '';
  get control(): FormControl {
    return this.controlDir.control as FormControl;
  }
  constructor(@Self() public controlDir: NgControl,private facadeService: FacadeService) {
    this.controlDir.valueAccessor = this;

  }

  ngOnInit(): void {
    if (this.initValue) {
      this.control.setValue(this.initValue);
    } else {
      if (this.items) {
        this.control.setValue(this.items[0][this.optionValueProp]);
      }
    }
    if (!this.items) {
      this.isLoading = false;
    }
    const control = this.controlDir.control;
    const validators = control?.validator ? [control.validator] : [];
    const asyncValidators = control?.asyncValidator ? [control.asyncValidator] : [];
    if (this.required) validators.push(Validators.required);

    control?.setValidators(validators);
    control?.setAsyncValidators(asyncValidators);
    control?.updateValueAndValidity();

  }

  onChange(event: any): void {}

  onTouched(): void {}

  selectionChanged(event: MatSelectChange): void {
    this.selectionChange.emit(new MatSelectChange(this.input, event.value));
    this.valueChange.emit(event.value);
    this.onChange(event.value);
    this.onTouched();
  }


  writeValue(obj: any): void {
    // // console.log(this.input);

    // this.input.nativeElement.value = obj || '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  get isEn(): boolean {
    return this.facadeService.translatorService.getCurrentLang() === 'en';
  }

}
