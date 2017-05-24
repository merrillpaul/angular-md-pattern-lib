import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PearsonToggleDirective } from './animation/toggle';
import { PearsonFadeDirective, FadeInOutAnimation } from './animation/fade';
import { CollapseAnimation } from './animation/collapse';
import { PearsonLoginComponent } from './pages/login.component';

export { PearsonToggleDirective, PearsonFadeDirective, FadeInOutAnimation, CollapseAnimation, PearsonLoginComponent };
@NgModule({
    imports: [
        FormsModule,
        CommonModule,
    ],
    exports: [
        FormsModule,
        CommonModule,
        PearsonToggleDirective,
        PearsonFadeDirective,
        PearsonLoginComponent
    ],
    declarations: [
        PearsonToggleDirective,
        PearsonFadeDirective,
        PearsonLoginComponent
    ],
    providers: [

    ]
})
export class PearsonUtilsModule { }
