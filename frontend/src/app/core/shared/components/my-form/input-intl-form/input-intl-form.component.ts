import { IntlDialogComponent } from './intl-dialog/intl-dialog.component';
import { DialogService } from '@services/dialog/dialog.service';
import { TranslatorService } from '@services/translate/translator.service';
import { Component, ElementRef, Input, OnInit, Output, Self, ViewChild, EventEmitter, forwardRef, OnDestroy } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { skip } from 'rxjs/internal/operators/skip';
import { LocalStorage } from '@constants/local-storage';
import { CountryIntl } from '@global/countries_intl';
import { countryList } from '@global/countries_intl';
@Component({
  selector: 'input-intl-form',
  templateUrl: './input-intl-form.component.html',
  styleUrls: ['./input-intl-form.component.scss'],
})
export class InputIntlFormComponent implements OnInit, ControlValueAccessor {

  @ViewChild('phoneNumberForm', {static: true}) input!: ElementRef<HTMLInputElement>;
  @Input() type = 'tel';
  @Input() label!: string;
  @Input() placeholder!: string;
  @Input() name!: string;
  @Input() showError = true;
  @Input() showCounter = false;
  @Input() required!: boolean;
  @Input() minlength: number = 5;
  @Input() maxlength: number = 20;
  @Input() min!: number;
  @Input() max!: number;
  @Input() pattern: string = '[+\\d]+';
  @Input() patternHint!: string;
  @Input() disabled = false;
  @Input() countryCode!: string;
  phoneNumber: string = '';
  @Input() set selectedCountry(value: CountryIntl) {
    this.selectCountryIntl(value);

  }
  @Output() intlChanged: EventEmitter<string> = new EventEmitter<string>();

  query = '';

  selectedCountryIntl!: CountryIntl;

  get flagSrc(): string {
    if (this.selectedCountryIntl?.code) {
      return `assets/img/country-list/flags/${this.selectedCountryIntl?.code.toLowerCase()}.png`;
    } else {
      return 'assets/icon/earth.svg';
    }
  }

  get getCountryList(): CountryIntl[] {
    return countryList();
  }
  get isNumber(): boolean {
    return this.type === 'number';
  }
  get isEn(): boolean {
    return this.translatorService.getCurrentLang() === 'en';
  }

  get control(): FormControl {
    return this.controlDir.control as FormControl;
  }
    set value(value: any) {
    this.control.setValue(value);
    this.notifyValueChange();
  }

  get value(): any {
    return this.control.value;
  }

  constructor(@Self() public controlDir: NgControl, private translatorService: TranslatorService,
   private dialogService: DialogService) {
    this.controlDir.valueAccessor = this;

  }


  // valueChanges$!: Subscription;
  ngOnInit(): void {
    this.initValidation();
    const countryCode = this.countryCode ?? 'EG';
    const country = this.getCountryList?.find(c => c.code === countryCode?.toUpperCase());
    if (country) {
      this.selectedCountryIntl = country;
    };
  }

  initValidation(): void {
    const control = this.controlDir.control;
    const validators = control?.validator ? [control.validator] : [];
    const asyncValidators = control?.asyncValidator ? [control.asyncValidator] : [];
    if (this.required === true) validators.push(Validators.required);
    if (this.minlength) validators.push(Validators.minLength(this.minlength));
    if (this.maxlength) validators.push(Validators.maxLength(this.maxlength));
    if (this.min) validators.push(Validators.min(this.min));
    if (this.max) validators.push(Validators.max(this.max));
    if (this.pattern) validators.push(Validators.pattern(this.pattern));

    control?.setValidators(validators);
    control?.setAsyncValidators(asyncValidators);
    control?.updateValueAndValidity();
  }


  showDialog(): void {
    this.dialogService.openDialog<CountryIntl, string>(IntlDialogComponent, this.selectedCountryIntl?.code).then(
      (data) => {
        if (data) {
          this.selectCountryIntl(data);
        }
      }
    );
  }


  selectCountryIntl(country: CountryIntl) {
    if (!country) return;
    this.selectedCountryIntl = country;
    const value = this.selectedCountryIntl.dial_code + (+this.input.nativeElement.value).toString() ;
    this.intlChanged.emit(value);
    this.setValue();
    // this.control.setValue(value);

  }
  setValue(): void {
    this.value = this.selectedCountryIntl?.dial_code + (+this.phoneNumber).toString();
  }

  onChange(event: any): void {

  }

  onTouched(): void {}

  writeValue(obj: any): void {
// this.setValue();
    // this.input.nativeElement.value = obj || '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  // ngOnDestroy(): void {
  //   //Called once, before the instance is destroyed.
  //   //Add 'implements OnDestroy' to the class.
  //   this.valueChanges$.unsubscribe();
  // }
  notifyValueChange(): void {
    if (this.onChange) {
      this.onChange(this.value);
    }
  }
}

// /////////////////////////

// import { NG_VALUE_ACCESSOR, ControlValueAccessor, NgControl, FormControl, Validators } from '@angular/forms';
// import { Component, Input, OnInit, forwardRef, ViewChild, ElementRef, Output, EventEmitter, Self } from '@angular/core';
// import { CountryIntl } from '@global/countries_intl';
// import { IntlDialogComponent } from './intl-dialog/intl-dialog.component';
// import { TranslatorService } from '@services/translate/translator.service';
// import { DialogService } from '@services/dialog/dialog.service';
// import { countryList } from '@global/countries_intl';

// // export const InputIntlForm_VALUE_ACCESSOR: any = {
// //   provide: NG_VALUE_ACCESSOR,
// //   useExisting: forwardRef(() => InputIntlFormComponent),
// //   multi: true,
// // };

// @Component({
//   selector: 'input-intl-form',
//   templateUrl: './input-intl-form.component.html',
//   styleUrls: ['./input-intl-form.component.scss'],
//   // providers: [InputIntlForm_VALUE_ACCESSOR]
// })
// export class InputIntlFormComponent implements OnInit, ControlValueAccessor {
//   @ViewChild('input', {static: true}) input!: ElementRef<HTMLInputElement>;
//   @Input() type = 'tel';
//   @Input() label!: string;
//   @Input() placeholder!: string;
//   @Input() name!: string;
//   @Input() showError = true;
//   @Input() showCounter = false;
//   @Input() required!: boolean;
//   @Input() minlength: number = 5;
//   @Input() maxlength: number = 15;
//   @Input() min!: number;
//   @Input() max!: number;
//   @Input() pattern: string = '[+\\d]+';
//   @Input() patternHint!: string;
//   @Input() disabled = false;
//   @Input() countryCode!: string;
//   @Input() set selectedCountry(value: CountryIntl) {
//     this.selectCountryIntl(value);

//   }
//   @Output() intlChanged: EventEmitter<string> = new EventEmitter<string>();
//   private _value: any;
//     get control(): FormControl {
//     return this.controlDir.control as FormControl;
//   }
//   // phoneNumber: string = '';
//   get phoneNumber(): string {
//     return (+this.input.nativeElement?.value!).toString();
//   }
//   selectedCountryIntl!: CountryIntl;
//   get flagSrc(): string {
//     if (this.selectedCountryIntl?.code) {
//       return `assets/country-list/flags/${this.selectedCountryIntl?.code.toLowerCase()}.png`;
//     } else {
//       return 'assets/icon/earth.svg';
//     }
//   }


//   set value(value: any) {
//     this.control.setValue(value);
//     this._value = value;
//     this.notifyValueChange();
//   }

//   get value(): any {
//     return this.control.value;
//   }

//   onChange!: (value: string) => {};
//   onTouched!: () => {};

//     constructor(
//       @Self() public controlDir: NgControl,
//       private translatorService: TranslatorService,
//    private dialogService: DialogService) {
//      this.selectedCountryIntl = countryList()[0];
//   }

//   notifyValueChange(): void {
//     if (this.onChange) {
//       this.onChange(this.value);
//     }
//   }

//   ngOnInit(): void {
//     const control = this.controlDir.control;
//     const validators = control?.validator ? [control.validator] : [];
//     const asyncValidators = control?.asyncValidator ? [control.asyncValidator] : [];
//     if (this.required === true) validators.push(Validators.required);
//     if (this.minlength) validators.push(Validators.minLength(this.minlength));
//     if (this.maxlength) validators.push(Validators.maxLength(this.maxlength));
//     if (this.min) validators.push(Validators.min(this.min));
//     if (this.max) validators.push(Validators.max(this.max));
//     if (this.pattern) validators.push(Validators.pattern(this.pattern));

//     control?.setValidators(validators);
//     control?.setAsyncValidators(asyncValidators);
//     control?.updateValueAndValidity();
//   }

//   writeValue(obj: any): void {
//     this._value = obj;
//   }

//   registerOnChange(fn: any): void {
//     this.onChange = fn;
//   }

//   registerOnTouched(fn: any): void {
//     this.onTouched = fn;
//   }

//   setDisabledState(isDisabled: boolean): void {
//   }

//     showDialog(): void {
//     this.dialogService.openPage<CountryIntl, string>(IntlDialogComponent, this.selectedCountryIntl?.code).then(
//       (data) => {
//         if (data) {
//           this.selectCountryIntl(data);
//         }
//       }
//     );
//   }

//   setValue(): void {
//     this.value = this.selectedCountryIntl?.dial_code + `${this.phoneNumber}`;
//   }

//   selectCountryIntl(country: CountryIntl) {
//     if (!country) return;
//     this.selectedCountryIntl = country;
//     const value = this.selectedCountryIntl?.dial_code + this.input.nativeElement.value ;
//     this.intlChanged.emit(value);
//     this.setValue();
//     // this.control.setValue(value);

//   }
// }
