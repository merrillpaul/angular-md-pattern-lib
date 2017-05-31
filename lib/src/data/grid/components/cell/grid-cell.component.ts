import {
    Component, Renderer2, ElementRef, Input, Output,
    ContentChildren, TemplateRef, QueryList, AfterContentInit, EventEmitter
} from '@angular/core';

import { GridColumnMetadata } from '../../common/types/grid.column.metadata';
import { GridCellClickEvent } from '../../common/events/grid.cell.click.event';
import { EditorType } from '../../common/enums/editor.type.enum';
import { GridEditorType } from '../../common/types/grid.editor';
import { ListItems } from '../../common/types/grid.list.items';
import { GridCustomColumnTemplateDirective } from '../../directives/grid.template.directive';

@Component({
    selector: 'td[psn-data-cell]',
    templateUrl: './grid-cell.component.html',
    styleUrls: ['./grid-cell.component.scss']
})

export class GridCellComponent implements AfterContentInit {
    constructor(private _elementRef: ElementRef, private _renderer: Renderer2) {
        this._renderer.addClass(this._elementRef.nativeElement, 'psn-data-cell');
    }

    /** template fetching support */
    private _templateMap: Map<string, TemplateRef<any>> = new Map<string, TemplateRef<any>>();
    @ContentChildren(GridCustomColumnTemplateDirective) _templates: QueryList<GridCustomColumnTemplateDirective>;

    @Input('column') column: GridColumnMetadata;

    @Input('row') row: any;

    @Input('rowIndex') rowIndex: number;

    @Output('cellClick') onCellClick: EventEmitter<GridCellClickEvent> = new EventEmitter<GridCellClickEvent>();

    private _dataCell: boolean = true;

    @Input('data')
    set data(data: string | boolean) {
        this._dataCell = data !== '' ? (data === 'true' || data === true) : true;
    }
    get datacell(): boolean {
        return this._dataCell;
    }

    ngAfterContentInit(): void {
        for (let i: number = 0; i < this._templates.toArray().length; i++) {
            this._templateMap.set(
                this._templates.toArray()[i].psnGridColumnTemplate,
                this._templates.toArray()[i].templateRef,
            );
        }
    }


    private _editing: boolean = false;


    showEditor(): void {
        this._editing = true;
    }

    hideEditor(): void {
        this._editing = false;
    }

    public get editing(): boolean {
        return this._editing;
    }

    handleCellClick(event: Event) {
        if (this.column.editable === true) {
            event.stopPropagation();
            this._editing = true;
            console.log('Cell Clicked', this.rowIndex, this.row, this.row[this.column.name], this._editing);
        }
        this.onCellClick.emit({
            row: this.row,
            rowIndex: this.rowIndex,
            column: this.column,
            data: this.row[this.column.name]
        });
    }

    getTemplateRef(name: string): TemplateRef<any> {
        return this._templateMap.get(name);
    }

    getCellValue(column: GridColumnMetadata, value: any): string {
        if (column.nested === undefined || column.nested) {
            return this._getNestedValue(column.name, value);
        }
        return value[column.name];
    }

    private _getNestedValue(name: string, value: any): string {
        if (!(value instanceof Object) || !name) {
            return value;
        }
        if (name.indexOf('.') > -1) {
            let splitName: string[] = name.split(/\.(.+)/, 2);
            return this._getNestedValue(splitName[1], value[splitName[0]]);
        } else {
            return value[name];
        }
    }

}