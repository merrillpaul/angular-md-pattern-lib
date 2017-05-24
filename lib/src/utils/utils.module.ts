import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PearsonToggleDirective } from './animation/toggle';
import { PearsonFadeDirective, FadeInOutAnimation } from './animation/fade';
import { CollapseAnimation } from './animation/collapse';
import { PearsonLoginComponent } from './pages/login.component';
import { InvertedColorDirective } from './directives/inverted.color.directive';

export { PearsonToggleDirective, PearsonFadeDirective, FadeInOutAnimation, CollapseAnimation, PearsonLoginComponent, InvertedColorDirective };
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
        PearsonLoginComponent,
        InvertedColorDirective
    ],
    declarations: [
        PearsonToggleDirective,
        PearsonFadeDirective,
        PearsonLoginComponent,
        InvertedColorDirective
    ],
    providers: [

    ]
})
export class PearsonUtilsModule { }
