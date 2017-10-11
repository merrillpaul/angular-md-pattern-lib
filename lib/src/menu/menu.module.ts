import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule, MatMenuModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { PearsonMenuComponent } from './component/menu.component';

export { PearsonMenuComponent };

@NgModule({
    imports: [
        CommonModule,
        MatListModule,
        MatMenuModule,
        FlexLayoutModule
    ],
    exports: [
        MatListModule,
        MatMenuModule,
        PearsonMenuComponent
    ],
    declarations: [PearsonMenuComponent],
    providers: [],
})
export class PearsonMenuModule { }
