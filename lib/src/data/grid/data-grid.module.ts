import { NgModule, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MdCheckboxModule, MdTooltipModule, MdIconModule, MdSelectionModule } from '@angular/material';

import { GridCellComponent } from './components/cell/grid-cell.component';
import { GridColumnComponent } from './components/column/grid-column.component';
import { GridRowComponent } from './components/row/grid-row.component';
import { GridBodyComponent } from './components/body/grid-body.component';
import { DataGridComponent } from './components/data-grid.component';
import { GridCustomColumnTemplateDirective } from './directives/grid.template.directive';
import { DataGridService } from './services/data-grid.service';


export * from './common/enums/editor.type.enum';
export * from './common/enums/sort.order.enum';
export * from './common/events/grid.select.event';
export * from './common/events/grid.select.all.event';
export * from './common/events/grid.row.click.event';
export * from './common/events/grid.cell.click.event';
export * from './common/events/grid.cell.changed.event';
export * from './common/events/grid.column.sort.event';
export * from './common/types/grid.editor';
export * from './common/types/grid.list.items';
export * from './common/types/grid.column.metadata';

export { GridCellComponent } from './components/cell/grid-cell.component';
export { GridColumnComponent } from './components/column/grid-column.component';
export { GridRowComponent } from './components/row/grid-row.component';
export { GridBodyComponent } from './components/body/grid-body.component';
export { DataGridComponent } from './components/data-grid.component';
export { DataGridService } from './services/data-grid.service';

const GRID_COMPS: Type<any>[] = [
    GridCellComponent,
    GridColumnComponent,
    GridRowComponent,
    GridBodyComponent,
    DataGridComponent,
    GridCustomColumnTemplateDirective
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MdCheckboxModule, 
        MdTooltipModule, 
        MdIconModule, 
        MdSelectionModule
    ],
    exports: [
        GRID_COMPS
    ],
    declarations: [
        GRID_COMPS
    ],
    providers: [
        DataGridService
    ],
})
export class PearsonDataGridModule { }
