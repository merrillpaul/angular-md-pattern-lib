import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout'

import { LabelComponent } from './label.component';
import { LabelInvertedDirective } from './label.inverted.directive';
export { LabelComponent } from './label.component';

@NgModule({
    imports: [
        FlexLayoutModule,
        CommonModule
    ],
    exports: [LabelComponent, LabelInvertedDirective],
    declarations: [LabelComponent, LabelInvertedDirective],
    providers: [],
})
export class PearsonLabelModule { }
