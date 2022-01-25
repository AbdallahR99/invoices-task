import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[numberFormat]'
})
export class NumberFormatDirective {
  @Input() max = 1000000000;
  @Input() numberFormat = true;
  constructor(public el: ElementRef<HTMLInputElement>) {}
  @HostListener('input') input(): void {
    if (!this.numberFormat) return;
    const stringValue = this.el.nativeElement.value;
    if (stringValue.includes('.')) {
      if (stringValue.substr(stringValue.indexOf('.')).length > 3)
        this.el.nativeElement.valueAsNumber = +stringValue.slice(0, stringValue.indexOf('.') + 3);


    } else {
      // this.el.nativeElement.valueAsNumber = +stringValue.padEnd(2, '.00');
    }
    if (this.max) {
      if (this.el.nativeElement.valueAsNumber > +this.max) {
        this.el.nativeElement.valueAsNumber = +this.max;
      }
    }
  }
}
