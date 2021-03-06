import { Directive, HostListener, EventEmitter, Output, ElementRef } from '@angular/core';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[scrollable]'
})
export class ScrollableDirective {

  @Output() scrollPosition = new EventEmitter();


  constructor(public el: ElementRef) {}

  @HostListener('scroll', ['$event'])
  onScroll(event: any): void {
    try {

      const top = event.target.scrollTop;
      const height = this.el.nativeElement.scrollHeight;
      const offset = this.el.nativeElement.offsetHeight;


      if (top > height - offset - 1) {
        this.scrollPosition.emit('bottom');
      }

      if (top === 0) {
        this.scrollPosition.emit('top');
      }

    } catch (err) {}
  }

  // @HostListener('window:resize', ['$event']) onLoad(): void {
  //   // console.log('Helloooooooo');
  // }

}
