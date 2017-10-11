import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatDialogModule, MatInputModule, MatButtonModule, MatToolbarModule } from '@angular/material';

import { DialogComponent } from './component/dialog.component';
import { DialogService } from './services/dialog.service';


export { DialogOptions } from './component/dialog.options';
export { DialogType } from './component/dialog.type';

export { DialogService };

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        MatDialogModule,
        MatInputModule,
        MatButtonModule,
        MatToolbarModule
    ],
    exports: [
        DialogComponent
    ],
    declarations: [DialogComponent],
    providers: [
        DialogService
    ],
    entryComponents: [
        DialogComponent
    ]
})
export class PearsonDialogModule { }
