import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout'

import { LabelComponent } from './label.component';
export { LabelComponent } from './label.component';

@NgModule({
    imports: [
        FlexLayoutModule,
        CommonModule
    ],
    exports: [LabelComponent],
    declarations: [LabelComponent],
    providers: [],
})
export class PearsonLabelModule { }
