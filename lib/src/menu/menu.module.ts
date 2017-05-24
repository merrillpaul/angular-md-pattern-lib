import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdListModule, MdMenuModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { PearsonMenuComponent } from './component/menu.component';

export { PearsonMenuComponent };

@NgModule({
    imports: [
        CommonModule,
        MdListModule,
        MdMenuModule,
        FlexLayoutModule
    ],
    exports: [
        MdListModule,
        MdMenuModule,
        PearsonMenuComponent
    ],
    declarations: [PearsonMenuComponent],
    providers: [],
})
export class PearsonMenuModule { }
