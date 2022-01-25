import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss']
})
export class ErrorMessageComponent implements OnInit {
  @Input() image = 'assets/img/empty.png';
  @Input() imageWidth = 200;
  @Input() message = 'Unkown Error Message';

  /**
   *
   * from @bootstrap colors name
   * check 'assets/scss/colors'
   */
  @Input() messageColor = 'danger';

  constructor() { }

  ngOnInit(): void {
  }

}
