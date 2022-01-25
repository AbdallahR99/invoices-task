import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LocalStorage } from '@constants/local-storage';

import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import ar from '@angular/common/locales/ar';
import { registerLocaleData } from '@angular/common';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { JwtModule } from '@auth0/angular-jwt';

import { environment } from '@environments/environment';
import { HeaderComponent } from './core/shared/components/layout/header/header.component';
import { FooterComponent } from './core/shared/components/layout/footer/footer.component';

import {MatProgressBarModule} from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogModule } from '@shared/dialog/confirm-dialog/confirm-dialog.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';

registerLocaleData(ar);

export function createTranslateLoader(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function tokenGetter(): string {
  const token = localStorage.getItem(LocalStorage.TOKEN)!;
  return localStorage.getItem(LocalStorage.TOKEN)!;
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatDialogModule,
    ConfirmDialogModule,
    MatSnackBarModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: [ environment.apiUrl,
         "localhost:44302" , "https://localhost:44302/"],
        // disallowedRoutes: ['api.zoolker.com/api/account']
      }
    }),


    MatProgressBarModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
