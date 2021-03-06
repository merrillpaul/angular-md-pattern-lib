import { NgModule, Optional, SkipSelf , ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'app/shared/shared.module';

import { SecurityService } from './services';


@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    
  ],
  declarations: [
   
  ],
  providers: [   
    SecurityService   
  ]
})
export class CoreModule {
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }

  static forRoot(): ModuleWithProviders {
        return {
            ngModule: CoreModule
        };
    }
}
