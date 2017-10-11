import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatIconModule, MatSelectModule, MatButtonModule } from '@angular/material';

import { FlexLayoutModule } from '@angular/flex-layout';

import { PaginationComponent } from './components/pagination.component';

import { PageChangeEvent } from './page.event';
export { PaginationComponent, PageChangeEvent };

@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        FormsModule,
        MatIconModule, 
        MatSelectModule, 
        MatButtonModule
    ],
    exports: [
        PaginationComponent
    ],
    declarations: [
        PaginationComponent
    ],
    providers: [],
})
export class PearsonPaginationModule { }
