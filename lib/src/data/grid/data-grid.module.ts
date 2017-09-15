import { NgModule, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MdCheckboxModule, MdTooltipModule, MdIconModule, MdSelectModule, MdPseudoCheckboxModule } from '@angular/material';

import { GridCellComponent } from './components/cell/grid-cell.component';
import { GridColumnComponent } from './components/column/grid-column.component';
import { GridRowComponent } from './components/row/grid-row.component';
import { GridHeaderComponent } from './components/header/grid-header.component';
import { GridBodyComponent } from './components/body/grid-body.component';
import { DataGridComponent } from './components/data-grid.component';
import { GridCustomColumnTemplateDirective } from './directives/grid.template.directive';
import { DataGridService } from './services/data-grid.service';


export { EditorType } from './common/enums/editor.type.enum';
export { SortOrder } from './common/enums/sort.order.enum';
export { GridRowSelectEvent } from './common/events/grid.select.event';
export { GridRowContextClickEvent } from './common/events/grid.row.context.click.event';
export { GridSelectAllEvent } from './common/events/grid.select.all.event';
export { GridRowClickEvent } from './common/events/grid.row.click.event';
export { GridCellClickEvent } from './common/events/grid.cell.click.event';
export { GridCellChangedEvent } from './common/events/grid.cell.changed.event';
export { GridColumnSortChangeEvent } from './common/events/grid.column.sort.event';
export { GridRowsAddedEvent } from './common/events/grid.rows.added.event';
export { GridRowsRemovedEvent } from './common/events/grid.rows.removed.event';
export { GridEditorType } from './common/types/grid.editor';
export { ListItems } from './common/types/grid.list.items';
export { GridColumnMetadata } from './common/types/grid.column.metadata';

export { GridCellComponent } from './components/cell/grid-cell.component';
export { GridColumnComponent } from './components/column/grid-column.component';
export { GridRowComponent } from './components/row/grid-row.component';
export { GridHeaderComponent } from './components/header/grid-header.component';
export { GridBodyComponent } from './components/body/grid-body.component';
export { DataGridComponent } from './components/data-grid.component';
export { DataGridService } from './services/data-grid.service';

const GRID_COMPS: Type<any>[] = [
    GridCellComponent,
    GridColumnComponent,
    GridRowComponent,
    GridHeaderComponent,
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
        MdSelectModule,
        MdPseudoCheckboxModule,
        FlexLayoutModule
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
