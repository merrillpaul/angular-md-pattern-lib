import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PearsonScrollerComponent } from './scroller.component'

export { PearsonScrollerComponent };
@NgModule({
    imports: [
        FormsModule,
        CommonModule,
    ],
    exports: [
        FormsModule,
        CommonModule,
        PearsonScrollerComponent
    ],
    declarations: [
      PearsonScrollerComponent
    ],
    providers: [
        
    ]
})
export class PearsonScrollerModule { }
