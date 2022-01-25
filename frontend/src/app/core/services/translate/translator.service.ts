import { DOCUMENT } from '@angular/common';
import { EventEmitter, Inject, Injectable } from '@angular/core';
import { LocalStorage } from '@constants/local-storage';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslatorService {

  constructor(private translate: TranslateService, @Inject(DOCUMENT) private document: Document) { }
  get onLangChange(): EventEmitter<LangChangeEvent> {
    return this.translate.onLangChange;
  }
  getCurrentLang(): string | null {
    return localStorage.getItem(LocalStorage.LANGAUGE);
  }

  setCurrentLang(languageCode: string): void {
    if (!languageCode) {languageCode = 'ar'; }

    this.translate.use(languageCode);
    this.translate.setDefaultLang(languageCode);
    this.translate.currentLang = languageCode;
    if (languageCode === 'ar') {
        this.document.documentElement.setAttribute('dir', 'rtl');
        this.document.documentElement.lang = 'ar';
        this.document.getElementsByTagName('html')[0]?.setAttribute('lang', 'ar');
        this.document.getElementsByTagName('html')[0]?.setAttribute('dir', 'rtl');
        this.document.getElementsByTagName('body')[0]?.setAttribute('dir', 'rtl');
        this.document.getElementsByTagName('body')[0]?.classList.remove('ltr');
        this.document.getElementsByTagName('body')[0]?.classList.add('rtl');
     }
    if (languageCode === 'en') {
         this.document.documentElement.setAttribute('dir', 'ltr');
         this.document.documentElement.lang = 'en';
        this.document.getElementsByTagName('html')[0]?.setAttribute('lang', 'en');
        this.document.getElementsByTagName('html')[0]?.setAttribute('dir', 'ltr');
        this.document.getElementsByTagName('body')[0]?.setAttribute('dir', 'ltr');
        this.document.getElementsByTagName('body')[0]?.classList.remove('rtl');
        this.document.getElementsByTagName('body')[0]?.classList.add('ltr');
      }
      localStorage.setItem(LocalStorage.LANGAUGE, languageCode);
    }

    translateWord(val: string): string{
      return this.translate?.instant(val || ' ');
    }
}
