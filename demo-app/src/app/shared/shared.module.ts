import { NgModule, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { PearsonMaterialModule } from '@pearson/angular-material';

@NgModule({
  imports: [
    CommonModule,
    PearsonMaterialModule,
    HttpModule
  ],
  exports: [
    PearsonMaterialModule,
    HttpModule
  ],
  declarations: [
    
  ],
  providers: [
    
  ],
  entryComponents: [
  
  ]
})
export class SharedModule { }
