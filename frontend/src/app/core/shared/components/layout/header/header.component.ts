import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { FacadeService } from '@services/facade.service';
import { Routes } from '@constants/routes';
import { User } from '@models/user/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isCollapsed = true;
  get isAuthed(): boolean {
    return this.facadeService.authService.isAuthenticated;
  }

  get user(): User {
    return this.facadeService.authService.user!;
  }

  get routes(): typeof Routes {
    return Routes;
  }

  get $isLoading(): Observable<boolean> {
    return this.facadeService.routerLoaderService.$isLoading;
  }

  get isEn(): boolean {
    return this.facadeService.translatorService.getCurrentLang() == 'en';
  }

  constructor(private facadeService: FacadeService) { }

  ngOnInit(): void {
  }

  toggleLanguage() {
    this.facadeService.translatorService.setCurrentLang(this.isEn ? 'ar' : 'en');
  }

  logOut(): void {
    this.facadeService.authService.logOut();
  }


}
