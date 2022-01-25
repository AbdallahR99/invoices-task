// import { ConfirmDialogData } from './../../models/dialog/dialog.model';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogData } from '@models/dialog/dialog.model';
import { ConfirmDialogComponent } from '@shared/dialog/confirm-dialog/confirm-dialog.component';
// import { ConfirmDialogComponent } from '@shared/dialog/confirm-dialog/confirm-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  async confirmDialog(data?: ConfirmDialogData): Promise<boolean> {
    return await this.dialog.open(ConfirmDialogComponent, {data}).afterClosed().toPromise();
  }

  async openDialog<RETURN, PARAM>(page: any, param?: PARAM): Promise<RETURN> {
    const data = param;
    return await this.dialog.open(page, {data}).addPanelClass('dialogn-width').afterClosed().toPromise();
  }

}
