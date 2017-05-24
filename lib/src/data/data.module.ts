import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MdIconModule, MdSelectModule, MdButtonModule } from '@angular/material';

import { FlexLayoutModule } from '@angular/flex-layout';

import { PearsonPaginationModule } from './pagination/pagination.module';
export * from './pagination/pagination.module';

@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        PearsonPaginationModule,
        MdIconModule,
        MdSelectModule,
        MdButtonModule
    ],
    exports: [
        PearsonPaginationModule
    ],
    declarations: [],
    providers: [],
})
export class PearsonDataModule { }
