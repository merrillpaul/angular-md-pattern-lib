import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout'
import { BadgeComponent, BadgeHorizontalPosition, BadgeVerticalPosition } from './badge.component';


export { BadgeComponent, BadgeHorizontalPosition, BadgeVerticalPosition };


@NgModule({
    imports: [
        FlexLayoutModule,
        CommonModule
    ],
    exports: [
        FlexLayoutModule,
        BadgeComponent
    ],
    declarations: [BadgeComponent],
    providers: [],
})
export class PearsonBadgeModule { }
