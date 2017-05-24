import { Type } from '@angular/core';
import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { MdIconModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MessageComponent, MessageContainerDirective } from './message.component';



export { MessageComponent } from './message.component';

@NgModule({
  imports: [
    CommonModule,
    MdIconModule,
    FlexLayoutModule
  ],
  declarations: [
    MessageContainerDirective,
    MessageComponent
  ],
  exports: [
    FlexLayoutModule,
    MessageComponent,
    MessageContainerDirective
  ],
})
export class PearsonMessageModule {

}
