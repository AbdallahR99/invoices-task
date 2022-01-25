import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Routes as r } from '@constants/routes';
import { UnAuthedGuard } from '@guards/unauthed.guard';

const routes: Routes = [
  { path: r.MAIN.substring(1), loadChildren: () => import('./components/main/main.module').then(m => m.MainModule) },
  { path: r.LOGIN.substring(1), loadChildren: () => import('./components/auth/login/login.module').then(m => m.LoginModule),
  canActivate: [UnAuthedGuard]  },
  { path: r.REGISTER.substring(1), loadChildren: () => import('./components/auth/register/register.module').then(m => m.RegisterModule),
  canActivate: [UnAuthedGuard] },
  { path: r.INVOICES.substring(1), loadChildren: () => import('./components/invoices/invoices.module').then(m => m.InvoicesModule) },
  { path: '', redirectTo: r.MAIN.substring(1) , pathMatch: 'full' },
  { path: '*', redirectTo: r.MAIN.substring(1) , pathMatch: 'full' },
  { path: 'confirm-email', loadChildren: () => import('./components/auth/confirm-email/confirm-email.module').then(m => m.ConfirmEmailModule) },
  { path: '**', redirectTo: r.MAIN.substring(1) , pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
