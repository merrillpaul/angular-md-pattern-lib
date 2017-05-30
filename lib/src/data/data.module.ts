import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MdIconModule, MdSelectModule, MdButtonModule } from '@angular/material';

import { FlexLayoutModule } from '@angular/flex-layout';

import { PearsonPaginationModule } from './pagination/pagination.module';
export * from './pagination/pagination.module';

import { PearsonDataGridModule } from './grid/data-grid.module';
export * from './grid/data-grid.module';

@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        PearsonPaginationModule,
        PearsonDataGridModule,
        MdIconModule,
        MdSelectModule,
        MdButtonModule
    ],
    exports: [
        PearsonPaginationModule,
        PearsonDataGridModule
    ],
    declarations: [],
    providers: [],
})
export class PearsonDataModule { }
