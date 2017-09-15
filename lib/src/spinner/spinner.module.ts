import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MdProgressBarModule, MdProgressSpinnerModule } from '@angular/material';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';

import { FlexLayoutModule } from '@angular/flex-layout';

import { SpinnerComponent, SpinnerMode, SpinnerStrategy, SpinnerStyle, SpinnerType } from './component/spinner.component';
import { SpinnerService, SpinnerConfig } from './services/spinner.service';
import { SpinnerDirective } from './directives/spinner.directive';
import { SpinnerFactory } from './services/spinner.factory';

export { SpinnerMode, SpinnerStrategy, SpinnerStyle, SpinnerType };
export { SpinnerService, SpinnerConfig};

@NgModule({
    imports: [
        FlexLayoutModule,
        CommonModule,
        MdProgressBarModule,
        MdProgressSpinnerModule,
        OverlayModule,
        PortalModule
    ],
    exports: [
        SpinnerComponent, SpinnerDirective
    ],
    declarations: [
        SpinnerComponent, SpinnerDirective
    ],
    providers: [
        SpinnerService,
        SpinnerFactory
    ],
    entryComponents: [
        SpinnerComponent
    ]
})
export class PearsonSpinnerModule { }
