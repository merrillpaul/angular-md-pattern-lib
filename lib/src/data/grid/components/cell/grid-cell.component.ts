import { Component, Renderer2, ElementRef, Input } from '@angular/core';

import { GridColumnMetadata } from '../../common/types/grid.column.metadata';
import { EditorType } from '../../common/enums/editor.type.enum';
import { GridEditorType } from '../../common/types/grid.editor';
import { ListItems } from '../../common/types/grid.list.items';

@Component({
    selector: 'td[psn-data-cell]',
    templateUrl: './grid-cell.component.html',
    styleUrls: ['./grid-cell.component.scss']
})

export class GridCellComponent {
    constructor(private _elementRef: ElementRef, private _renderer: Renderer2) {
        this._renderer.addClass(this._elementRef.nativeElement, 'psn-data-cell');
    }

    @Input('columnInfo') column: GridColumnMetadata;

    @Input('row') row: any;

    @Input('rowIndex') rowIndex: number;

    private _editing: boolean = false;


    showEditor(): void {
        this._editing = true;
    }

    hideEditor(): void {
        this._editing = false;
    }

    public get editor(): boolean {
        return this._editing;
    }

    handleCellClick(event: Event) {
        this._editing = !this._editing;
        console.log('Cell Clicked', this.rowIndex, this.row, this.row[this.column.name]. this._editing);
    }
}