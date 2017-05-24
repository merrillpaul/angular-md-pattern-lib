import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { MdDialogRef, MdDialog, MdDialogConfig } from '@angular/material';

import { DialogComponent } from '../component/dialog.component';
import { DialogOptions } from '../component/dialog.options';
import { DialogType } from '../component/dialog.type';

@Injectable()
export class DialogService {

    constructor(private dialog: MdDialog) { }

    public open(dialogType: DialogType,
        dialogOptions: DialogOptions, 
        options: any = null) : Observable<boolean> {
       return this._openDialog(dialogType, dialogOptions, options);
    }

    public info(dialogOptions: DialogOptions, options: any = null ) : Observable<boolean> {
        return this._openDialog(DialogType.INFO, dialogOptions, options);
    }

    public success(dialogOptions: DialogOptions, options: any = null ) : Observable<boolean> {
        return this._openDialog(DialogType.SUCCESS, dialogOptions, options);
    }

    public warning(dialogOptions: DialogOptions, options: any = null ) : Observable<boolean> {
        return this._openDialog(DialogType.WARNING, dialogOptions, options);
    }

    public error(dialogOptions: DialogOptions, options: any = null ) : Observable<boolean> {
        return this._openDialog(DialogType.ERROR, dialogOptions, options);
    }

    private _openDialog(dialogType: DialogType,
        dialogOptions: DialogOptions, 
        options: any = null) : Observable<boolean> {
            let dialogRef : MdDialogRef<DialogComponent>;
            dialogRef = this.dialog.open(DialogComponent, options);
            dialogRef.componentInstance.dialogData = dialogOptions;
            dialogRef.componentInstance.dialogType = dialogType;
            return dialogRef.afterClosed();  
    }

    
}