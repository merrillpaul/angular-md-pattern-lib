import {
    Component, Input, Output, EventEmitter, forwardRef, ChangeDetectionStrategy, ChangeDetectorRef,
    ContentChildren, ViewChild, TemplateRef, AfterContentInit, QueryList, Inject, Optional, ViewChildren,
    DoCheck, IterableDiffers, IterableChangeRecord, AfterViewInit
} from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

import { ENTER, SPACE, UP_ARROW, DOWN_ARROW } from '@angular/cdk/keycodes';

import { GridCellChangedEvent } from '../common/events/grid.cell.changed.event';
import { GridCellClickEvent } from '../common/events/grid.cell.click.event';
import { GridRowContextClickEvent } from '../common/events/grid.row.context.click.event';
import { GridColumnSortChangeEvent } from '../common/events/grid.column.sort.event';
import { GridRowClickEvent } from '../common/events/grid.row.click.event';
import { GridSelectAllEvent } from '../common/events/grid.select.all.event';
import { GridRowsAddedEvent } from '../common/events/grid.rows.added.event';
import { GridRowsRemovedEvent } from '../common/events/grid.rows.removed.event';
import { GridRowSelectEvent } from '../common/events/grid.select.event';

import { EditorType } from '../common/enums/editor.type.enum';
import { SortOrder } from '../common/enums/sort.order.enum';

import { GridColumnMetadata } from '../common/types/grid.column.metadata';
import { GridEditorType } from '../common/types/grid.editor';
import { ListItems } from '../common/types/grid.list.items';

import { GridCustomColumnTemplateDirective } from '../directives/grid.template.directive';
import { GridRowComponent } from './row/grid-row.component';


const empty: any = () => {
    // empty method
};

export const CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DataGridComponent),
    multi: true,
};


@Component({
    providers: [CONTROL_VALUE_ACCESSOR],
    selector: 'psn-data-grid',
    templateUrl: './data-grid.component.html',
    styleUrls: ['./data-grid.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataGridComponent implements ControlValueAccessor, AfterContentInit, DoCheck, AfterViewInit {
    /**
    * Implemented as part of ControlValueAccessor.
    */
    private _value: any[] = [];
    /** Callback registered via registerOnChange (ControlValueAccessor) */
    private _onChangeCallback: (_: any) => void = empty;

    private _refreshEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
    private _dataAddedEvent: EventEmitter<GridRowsAddedEvent> = new EventEmitter<GridRowsAddedEvent>();
    private _dataRemovedEvent: EventEmitter<GridRowsRemovedEvent> = new EventEmitter<GridRowsRemovedEvent>();
 
    

    /** internal attributes */
    private _data: any[];
    private _columns: GridColumnMetadata[];
    private _selectable: boolean = false;
    private _clickable: boolean = false;
    private _multiple: boolean = true;
    private _allSelected: boolean = false;
    private _indeterminate: boolean = false;
    private _selectOnClick: boolean = true;

    /**
     * Can be px, rem, em, vh etc
     * Setting a grid height gets a scroll with locked column headers
     */
    private _gridHeight: string;

    /** sorting */
    private _sortable: boolean = false;
    private _sortBy: GridColumnMetadata;
    private _sortOrder: SortOrder = SortOrder.ASC;

    /** shift select */
    private _lastSelectedIndex: number = -1;
    private _selectedBeforeLastIndex: number = -1;
    private _lastArrowKeyDirection: SortOrder;

    /** template fetching support */
    private _templateMap: Map<string, TemplateRef<any>> = new Map<string, TemplateRef<any>>();
    @ContentChildren(GridCustomColumnTemplateDirective) _templates: QueryList<GridCustomColumnTemplateDirective>;

    /** differ to listen to add or delete data */
    private differ: any;

    constructor( @Optional() @Inject(DOCUMENT) private _document: any,
        differs: IterableDiffers,
        private _changeDetectorRef: ChangeDetectorRef) {
        this.differ = differs.find([]).create(null);
    }

    ngAfterContentInit(): void {
        for (let i: number = 0; i < this._templates.toArray().length; i++) {
            this._templateMap.set(
                this._templates.toArray()[i].psnGridColumnTemplate,
                this._templates.toArray()[i].templateRef,
            );
        }
    }

    private _initialized: boolean = false;
    ngAfterViewInit(): void {
        this._initialized = true;    
    }

    ngDoCheck() {
        var changes = this.differ.diff(this._data);
        if (changes && this._initialized === true ) {
            changes.forEachAddedItem((r) => {
                this._dataAddedEvent.emit(new GridRowsAddedEvent(r))
            });
            changes.forEachRemovedItem((r) => {
                this._dataRemovedEvent.emit(new GridRowsRemovedEvent(r))
            });
        }
    }

    getTemplateRef(name: string): TemplateRef<any> {
        return this._templateMap.get(name);
    }

    @ViewChildren(GridRowComponent) _rows: QueryList<GridRowComponent>;


    get refreshEvent(): EventEmitter<boolean> {
        return this._refreshEvent;
    }

    @Output('dataAdded')
    get dataAddedEvent(): EventEmitter<GridRowsAddedEvent> {
        return this._dataAddedEvent;
    }

    @Output('dataRemoved')
    get dataRemovedEvent(): EventEmitter<GridRowsRemovedEvent> {
        return this._dataRemovedEvent;
    }
    
    /**
     * Returns true if all values are selected.
     */
    get allSelected(): boolean {
        return this._allSelected;
    }

    /**
     * Returns true if all values are not deselected
     * and atleast one is.
     */
    get indeterminate(): boolean {
        return this._indeterminate;
    }

    /**
     * Implemented as part of ControlValueAccessor.
     */
    @Input() set value(v: any) {
        if (v !== this._value) {
            this._value = v;
            this._onChangeCallback(v);
            this.refresh();
        }
    }
    get value(): any { return this._value; }

    /**
     * uniqueId?: string
     * Allows selection by [uniqueId] property.
     */
    @Input('uniqueId') uniqueId: string;

    /**
     * data?: {[key: string]: any}[]
     * Sets the data to be rendered as rows.
     */
    @Input('data')
    set data(data: any[]) {
        this._data = data;
        this.refresh();
    }
    get data(): any[] {
        return this._data;
    }


    @Input('columns')
    set columns(cols: GridColumnMetadata[]) {
        this._columns = cols;
    }
    get columns(): GridColumnMetadata[] {
        if (this._columns) {
            return this._columns;
        }

        if (this.hasData) {
            this._columns = [];
            // if columns is undefined, use key in [data] rows as name and label for column headers.
            let row: any = this._data[0];
            Object.keys(row).forEach((k: string) => {
                if (!this._columns.find((c: any) => c.name === k)) {
                    this._columns.push({ name: k, label: k });
                }
            });
            return this._columns;
        } else {
            return [];
        }
    }

    @Input('selectable')
    set selectable(selectable: string | boolean) {
        this._selectable = selectable !== '' ? (selectable === 'true' || selectable === true) : true;
    }
    get isSelectable(): boolean {
        return this._selectable;
    }

    @Input('gridHeight')
    set gridHeight(height: string) {
        this._gridHeight = height;
    }

    get gridHeight(): string {
        return this._gridHeight;
    }

    @Input('clickable')
    set clickable(clickable: string | boolean) {
        this._clickable = clickable !== '' ? (clickable === 'true' || clickable === true) : true;
    }
    get isClickable(): boolean {
        return this._clickable;
    }

    @Input('multiple')
    set multiple(multiple: string | boolean) {
        this._multiple = multiple !== '' ? (multiple === 'true' || multiple === true) : true;
    }
    get isMultiple(): boolean {
        return this._multiple;
    }

    @Input('selectOnClick')
    set selectOnClick(selectOnClick: string | boolean) {
        this._selectOnClick = selectOnClick !== '' ? (selectOnClick === 'true' || selectOnClick === true) : true;
    }
    get isSelectableOnRowClick(): boolean {
        return this._selectOnClick;
    }

    @Input('sortable')
    set sortable(sortable: string | boolean) {
        this._sortable = sortable !== '' ? (sortable === 'true' || sortable === true) : true;
    }
    get isSortable(): boolean {
        return this._sortable;
    }

    @Input('sortBy')
    set sortBy(columnName: string) {
        if (!columnName) {
            return;
        }
        const column: GridColumnMetadata = this.columns.find((c: any) => c.name === columnName);
        if (!column) {
            throw new Error('[sortBy] must be a valid column name');
        }

        this._sortBy = column;
    }
    get sortByColumn(): GridColumnMetadata {
        return this._sortBy;
    }

    /**
     * sortOrder?: ['ASC' | 'DESC'] or TdDataTableSortingOrder
     * Sets the sort order of the [sortBy] column. [sortable] needs to be enabled.
     * Defaults to 'ASC' or TdDataTableSortingOrder.Ascending
     */
    @Input('sortOrder')
    set sortOrder(order: 'ASC' | 'DESC') {
        let sortOrder: string = order ? order.toUpperCase() : 'ASC';
        if (sortOrder !== 'DESC' && sortOrder !== 'ASC') {
            throw new Error('[sortOrder] must be empty, ASC or DESC');
        }

        this._sortOrder = sortOrder === 'ASC' ?
            SortOrder.ASC : SortOrder.DESC;
    }
    get sortOrderEnum(): SortOrder {
        return this._sortOrder;
    }

    get hasData(): boolean {
        return this._data && this._data.length > 0;
    }


    @Output('sortChange') onSortChange: EventEmitter<GridColumnSortChangeEvent> =
    new EventEmitter<GridColumnSortChangeEvent>();

    @Output('rowSelect') onRowSelect: EventEmitter<GridRowSelectEvent> = new EventEmitter<GridRowSelectEvent>();

    @Output('rowClick') onRowClick: EventEmitter<GridRowClickEvent> = new EventEmitter<GridRowClickEvent>();

    @Output('selectAll') onSelectAll: EventEmitter<GridSelectAllEvent> = new EventEmitter<GridSelectAllEvent>();

    @Output('cellClick') onCellClick: EventEmitter<GridCellClickEvent> = new EventEmitter<GridCellClickEvent>();

    @Output('contextClick') onContextClick: EventEmitter<GridRowContextClickEvent> = new EventEmitter<GridRowContextClickEvent>();

    clearModel(): void {
        this._value.splice(0, this._value.length);
    }
    refresh(): void {
        this._calculateCheckboxState();
        if ( this._initialized === true) {
            this._refreshEvent.emit(true);
        }
        this._changeDetectorRef.markForCheck();
    }

    selectAll(checked: boolean): void {
        if (checked) {
            this._data.forEach((row: any) => {
                // skiping already selected rows
                if (!this.isRowSelected(row)) {
                    this._value.push(row);
                }
            });
            this._allSelected = true;
            this._indeterminate = true;
        } else {
            this.clearModel();
            this._allSelected = false;
            this._indeterminate = false;
        }
        this.onSelectAll.emit({ rows: this._value, selected: checked });
    }

    isRowSelected(row: any): boolean {
        // if selection is done by a [uniqueId] it uses it to compare, else it compares by reference.
        if (this.uniqueId) {
            return this._value ? this._value.filter((val: any) => {
                return val[this.uniqueId] === row[this.uniqueId];
            }).length > 0 : false;
        }
        return this._value ? this._value.indexOf(row) > -1 : false;
    }

    handleCellClick(event: GridCellClickEvent) {
        this.onCellClick.emit(event);
    }

    select(row: any, event: Event, currentSelected: number): void {
        if (this.isSelectable) {
            this.blockEvent(event);
            this._doSelection(row);

            // Check to see if Shift key is selected and need to select everything in between
            let mouseEvent: MouseEvent = event as MouseEvent;
            if (this.isMultiple && mouseEvent && mouseEvent.shiftKey && this._lastSelectedIndex > -1) {
                let firstIndex: number = currentSelected;
                let lastIndex: number = this._lastSelectedIndex;
                if (currentSelected > this._lastSelectedIndex) {
                    firstIndex = this._lastSelectedIndex;
                    lastIndex = currentSelected;
                }
                for (let i: number = firstIndex + 1; i < lastIndex; i++) {
                    this._doSelection(this._data[i]);
                }
            }
            // set the last selected attribute unless the last selected unchecked a row
            if (this.isRowSelected(this._data[currentSelected])) {
                this._selectedBeforeLastIndex = this._lastSelectedIndex;
                this._lastSelectedIndex = currentSelected;
            } else {
                this._lastSelectedIndex = this._selectedBeforeLastIndex;
            }
            // everything is unselected so start over
            if (!this._indeterminate && !this._allSelected) {
                this._lastSelectedIndex = -1;
            }
        }
    }

    disableTextSelection(): void {
        if (this._document) {
            this._document.onselectstart = function (): boolean {
                return false;
            };
        }
    }

    enableTextSelection(): void {
        if (this._document) {
            this._document.onselectstart = undefined;
        }
    }

    handleRowClick(row: any, event: Event, currentSelected: number): void {
        if (this.isClickable) {
            this.onRowClick.emit({ row: row });
            if (this._selectOnClick) {
                this.select(row, event, currentSelected);
            }
        }
    }

    onRightClick(event: Event, row: any, currentSelected: number): void {
        this.onContextClick.emit({ row: row, rowIndex: currentSelected, event: event  });
    }

    handleSort(column: GridColumnMetadata): void {
        if (this._sortBy === column) {
            this._sortOrder = this._sortOrder === SortOrder.ASC ?
                SortOrder.DESC : SortOrder.ASC;
        } else {
            this._sortBy = column;
            this._sortOrder = SortOrder.ASC;
        }
        this.onSortChange.next({ name: this._sortBy.name, order: this._sortOrder });
    }

    /**
     * Handle all keyup events when focusing a data table row
     */
    _rowKeyup(event: KeyboardEvent, row: any, index: number): void {
        let length: number;
        let rows: GridRowComponent[];
        switch (event.keyCode) {
            case ENTER:
            case SPACE:
                /** if user presses enter or space, the row should be selected */
                this.select(row, event, index);
                break;
            case UP_ARROW:
                rows = this._rows.toArray();
                length = rows.length;

                // check to see if changing direction and need to toggle the current row
                if (this._lastArrowKeyDirection === SortOrder.DESC) {
                    index++;
                }
                /** 
                 * if users presses the up arrow, we focus the prev row 
                 * unless its the first row, then we move to the last row
                 */
                if (index === 0) {
                    if (!event.shiftKey) {
                        rows[length - 1].focus();
                    }
                } else {
                    rows[index - 1].focus();
                }
                this.blockEvent(event);
                if (this.isMultiple && event.shiftKey) {
                    this._doSelection(this._data[index - 1]);
                    // if the checkboxes are all unselected then start over otherwise handle changing direction
                    this._lastArrowKeyDirection = (!this._allSelected && !this._indeterminate) ? undefined : SortOrder.ASC;
                }
                break;
            case DOWN_ARROW:
                rows = this._rows.toArray();
                length = rows.length;

                // check to see if changing direction and need to toggle the current row
                if (this._lastArrowKeyDirection === SortOrder.ASC) {
                    index--;
                }
                /** 
                 * if users presses the down arrow, we focus the next row 
                 * unless its the last row, then we move to the first row
                 */
                if (index === (length - 1)) {
                    if (!event.shiftKey) {
                        rows[0].focus();
                    }
                } else {
                    rows[index + 1].focus();
                }
                this.blockEvent(event);
                if (this.isMultiple && event.shiftKey) {
                    this._doSelection(this._data[index + 1]);
                    // if the checkboxes are all unselected then start over otherwise handle changing direction
                    this._lastArrowKeyDirection = (!this._allSelected && !this._indeterminate) ? undefined : SortOrder.DESC;
                }
                break;
            default:
            // default
        }
    }

    /**
     * Method to prevent the default events
     */
    blockEvent(event: Event): void {
        event.preventDefault();
    }

    /**
     * 
     * @param event Stop propagation
     */
    stopPropagation(event: Event): void {
        event.stopPropagation();
    }
    /**
     * Implemented as part of ControlValueAccessor.
     */
    writeValue(value: any): void {
        this.value = value;
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    onChange = (_: any) => empty;
    onTouched = () => empty;

    /**
     * Does the actual Row Selection
     */
    private _doSelection(row: any): void {
        let wasSelected: boolean = this.isRowSelected(row);
        if (!this._multiple) {
            this.clearModel();
        }
        if (!wasSelected) {
            this._value.push(row);
        } else {
            // if selection is done by a [uniqueId] it uses it to compare, else it compares by reference.
            if (this.uniqueId) {
                row = this._value.filter((val: any) => {
                    return val[this.uniqueId] === row[this.uniqueId];
                })[0];
            }
            let index: number = this._value.indexOf(row);
            if (index > -1) {
                this._value.splice(index, 1);
            }
        }
        this._calculateCheckboxState();
        this.onRowSelect.emit({ row: row, selected: this.isRowSelected(row) });
        this.onChange(this._value);
    }

    /**
     * Calculate all the state of all checkboxes
     */
    private _calculateCheckboxState(): void {
        this._calculateAllSelected();
        this._calculateIndeterminate();
    }

    /**
     * Checks if all visible rows are selected.
     */
    private _calculateAllSelected(): void {
        const match: string =
            this._data ? this._data.find((d: any) => !this.isRowSelected(d)) : true;
        this._allSelected = typeof match === 'undefined';
    }

    /**
     * Checks if all visible rows are selected.
     */
    private _calculateIndeterminate(): void {
        this._indeterminate = false;
        if (this._data) {
            for (let row of this._data) {
                if (!this.isRowSelected(row)) {
                    continue;
                }
                this._indeterminate = true;
            }
        }
    }

}

