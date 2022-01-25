import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FacadeService } from '@services/facade.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'itroots-task';

  constructor(private facadeService: FacadeService, @Inject(DOCUMENT) private document: Document) {}

  ngOnInit(): void {
    this.setCurrentLang();
  }

  setCurrentLang(): void{
    this.facadeService.translatorService.setCurrentLang(this.facadeService.translatorService.getCurrentLang() || 'ar');
  }

}
