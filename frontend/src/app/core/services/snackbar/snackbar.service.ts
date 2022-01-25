import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackBar: MatSnackBar) { }

  openSnackBar(message: string, action?: string, style?: Array<string>, time?: number): void {
    if (!style)
     { style = ['snackbar-secondary']; }
    if (!time) { time = 3000; }
    this.snackBar.open(message, action, {
      duration: time,
      panelClass: style
    });
  }

  error(message: string): void {
    this.openSnackBar(message, '×', ['snackbar-danger']);
  }

  secondary(message: string): void {
    this.openSnackBar(message, '×', ['snackbar-secondary']);
  }


  success(message: string): void {
    this.openSnackBar(message, '×', ['snackbar-success']);
  }
}
