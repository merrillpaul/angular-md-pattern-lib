import { Component, Input, Output, EventEmitter, Renderer2, ElementRef, HostBinding } from '@angular/core';

import { SortOrder } from '../../common/enums/sort.order.enum';
import { EditorType } from '../../common/enums/editor.type.enum';
import { GridColumnSortChangeEvent } from '../../common/events/grid.column.sort.event';
import { GridColumnMetadata } from '../../common/types/grid.column.metadata';


@Component({
  selector: 'div[psn-data-column]',
  styleUrls: ['./grid-column.component.scss' ],
  templateUrl: './grid-column.component.html',
})
export class GridColumnComponent {

  private _sortOrder: SortOrder = SortOrder.ASC;

  @Input('columnInfo') column: GridColumnMetadata;

  @Input('name') name: string = '';

  @Input('sortable') sortable: boolean = false;

  @Input('active') active: boolean = false;

  @Input('sortOrder')
  set sortOrder(order: 'ASC' | 'DESC') {
    let sortOrder: string = order ? order.toUpperCase() : 'ASC';
    if (sortOrder !== 'DESC' && sortOrder !== 'ASC') {
      throw new Error('[sortOrder] must be empty, ASC or DESC');
    }

    this._sortOrder = sortOrder === 'ASC' ?
      SortOrder.ASC : SortOrder.DESC;
  }

  @Output('sortChange') onSortChange: EventEmitter<GridColumnSortChangeEvent> =
                        new EventEmitter<GridColumnSortChangeEvent>();

  @HostBinding('class.mat-clickable')
  get bindClickable(): boolean {
    /*  
    let c: GridColumnMetadata = {
        name: 'jaba',
        label: 'JABS',
        sortable: true,
        hidden: false,
        editable: true,
        format: (val=>val.toUpperCase()),
        editor: {
            type: EditorType.LIST,
            items: [
                {
                    value: '1',
                    label: "One"
                }
            ]
        }
    }*/
    return this.sortable;
  }

  @HostBinding('class.mat-sortable')
  get bindSortable(): boolean {
    return this.sortable;
  }

  @HostBinding('class.mat-active')
  get bindActive(): boolean {
    return this.active;
  }

  constructor(private _elementRef: ElementRef, private _renderer: Renderer2) {
    this._renderer.addClass(this._elementRef.nativeElement, 'psn-data-column');
  }

  handleSortBy(): void {
    this.onSortChange.emit({name: this.name, order: this._sortOrder});
  }

  isAscending(): boolean {
    return this._sortOrder === SortOrder.ASC;
  }

  isDescending(): boolean {
    return this._sortOrder === SortOrder.DESC;
  }

}
