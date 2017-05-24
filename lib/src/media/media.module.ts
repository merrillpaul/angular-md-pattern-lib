import { NgModule } from '@angular/core';

import { FlexLayoutModule } from '@angular/flex-layout';

import { MediaQueryService } from './services/media.service';
import { MediaDirective } from './directives/media.directive';


export { MediaQueryService, MediaDirective };
@NgModule({
    imports: [
        FlexLayoutModule
    ],
    exports: [
        FlexLayoutModule,
        MediaDirective
    ],
    declarations: [
        MediaDirective
    ],
    providers: [
        MediaQueryService
    ],
})
export class PearsonMediaModule { }
