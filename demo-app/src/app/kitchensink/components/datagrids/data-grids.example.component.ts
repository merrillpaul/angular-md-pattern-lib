import { Component, OnInit, ChangeDetectorRef } from '@angular/core';


import { DialogService, PageChangeEvent } from '@pearson/angular-material';

import { GridColumnMetadata, EditorType, GridColumnSortChangeEvent, SortOrder, 
    GridRowClickEvent, GridCellClickEvent } from '@pearson/angular-material';

const DATE_FORMAT: (v: any) => any = (v: number) => {
    return new Date(v);
};
const CURRENCY_FORMAT: (v: any) => any = (v: number) => {
    return '$ ' + v.toFixed(2);
};

@Component({
    selector: 'data-grids-examples',
    templateUrl: './data-grids.example.component.html'
})
export class DataGridsExampleComponent implements OnInit {
    constructor(private _dlg: DialogService, private ref: ChangeDetectorRef) { }

    ngOnInit() { }

    columns: GridColumnMetadata[] = [
        {
            name: "name",
            label: "Subtest Name",
            editable: true,
            sortable: true
           
        },
        {
            name: "guid",
            label: "Guid",
            width: "150px"           
            
        },
        {
            name: 'createdDate',
            label: "Created Date",
            format: DATE_FORMAT
        },
        {
            name: 'price',
            label: "Price",
            sortable: true,
            format: CURRENCY_FORMAT
        },
        {
            name: 'category',
            label: "Category",
            editable: true,
            sortable: true,
            editor: {
                type: EditorType.LIST,
                items: [
                    {
                        label: "Speech",
                        value: "SP"
                    },
                    {
                        label: "Writing",
                        value: "WR"
                    }
                ]
            }
        }
    ];

     columns1: GridColumnMetadata[] = [
        {
            name: "name",
            label: "Subtest Name"            
        },
        {
            name: "guid",
            label: "Guid"
        },
        {
            name: 'createdDate',
            label: "Created Date"
            
        },
        {
            name: 'price',
            label: "Price"           
        },
        {
            name: 'category',
            label: "Category"
           
        },
         {
            name: "actions",
            label: "Actions"            
        }
    ];

    columns2: GridColumnMetadata[] = [
        {
            name: "name",
            label: "Subtest Name"            
        },
        {
            name: "guid",
            label: "Guid"
        },
        {
            name: 'createdDate',
            label: "Created Date"
            
        },
        {
            name: 'price',
            label: "Price"           
        },
        {
            name: 'category',
            label: "Category"
           
        },
         {
            name: "actions",
            label: "Actions"            
        }
    ];

    data: any[] = [
        {
            id: '1',
            name: 'WIAT-III',
            guid: "W010101001",
            createdDate: Date.now(),
            price: 25.325,
            category: "WR"
        },
        {
            id: '2',
            name: 'WISC-V',
            guid: "W2020202020",
            createdDate: Date.now(),
            price: 22.55,
            category: "WI"
        },
         {
            id: '3',
            name: 'WMS4',
            guid: "eddd",
            createdDate: Date.now(),
            price: 11.589,
            category: "WI"
        },
         {
            id: '4',
            name: 'PPVT4',
            guid: "PP0000",
            createdDate: Date.now(),
            price: 0,
            category: "WI"
        },
         {
            id: '5',
            name: 'PPVT-V',
            guid: "PP55555",
            createdDate: Date.now(),
            price: 0,
            category: "WI"
        },
         {
            id: '6',
            name: 'KTEA A',
            guid: "KA00001",
            createdDate: Date.now(),
            price: 11,
            category: "WI"
        },
         {
            id: '7',
            name: 'KTEA B',
            guid: "W2020202020",
            createdDate: Date.now(),
            price: 45,
            category: "WI"
        },
         {
            id: '8',
            name: 'LTE',
            guid: "W2020202020",
            createdDate: Date.now(),
            price: 125,
            category: "WI"
        },
         {
            id: '9',
            name: 'GFTA',
            guid: "W2020202020",
            createdDate: Date.now(),
            price: 125,
            category: "WI"
        }
    ];

    addRow(): void {
        let data = this.data.map((it) => it);
        data.unshift( {
            name: 'NEW',
            guid: "NNNNN",
            createdDate: Date.now(),
            price: 0,
            category: "WI"
        });
        this.data = data;       
    }

    changeAllRows(): void {
        this.data = this.data.concat(this.data1.map((it) => {
            it.name = 'New ' + it.name;
            return it;
        }));
    }

    onDataAdded(event): void {
        console.log('On data added', event);
    }

    data1: any[] = [
        {
            id: '1',
            name: 'WIAT-III',
            guid: "W010101001",
            createdDate: Date.now(),
            price: 25.325,
            category: "WR"
        },
        {
            id: '2',
            name: 'WISC-V',
            guid: "W2020202020",
            createdDate: Date.now(),
            price: 22.55,
            category: "WI"
        },
         {
            id: '3',
            name: 'WMS4',
            guid: "eddd",
            createdDate: Date.now(),
            price: 11.589,
            category: "WI"
        },
         {
            id: '4',
            name: 'PPVT4',
            guid: "PP0000",
            createdDate: Date.now(),
            price: 0,
            category: "WI"
        },
         {
            id: '5',
            name: 'PPVT-V',
            guid: "PP55555",
            createdDate: Date.now(),
            price: 0,
            category: "WI"
        },
         {
            id: '6',
            name: 'KTEA A',
            guid: "KA00001",
            createdDate: Date.now(),
            price: 11,
            category: "WI"
        },
         {
            id: '7',
            name: 'KTEA B',
            guid: "W2020202020",
            createdDate: Date.now(),
            price: 45,
            category: "WI"
        },
         {
            id: '8',
            name: 'LTE',
            guid: "W2020202020",
            createdDate: Date.now(),
            price: 125,
            category: "WI"
        },
         {
            id: '9',
            name: 'GFTA',
            guid: "W2020202020",
            createdDate: Date.now(),
            price: 125,
            category: "WI"
        }
    ];
    data2: any[] = [
        {
            id: '1',
            name: 'WIAT-III',
            guid: "W010101001",
            createdDate: Date.now(),
            price: 25.325,
            category: "WR"
        },
        {
            id: '2',
            name: 'WISC-V',
            guid: "W2020202020",
            createdDate: Date.now(),
            price: 22.55,
            category: "WI"
        },
         {
            id: '3',
            name: 'WMS4',
            guid: "eddd",
            createdDate: Date.now(),
            price: 11.589,
            category: "WI"
        },
         {
            id: '4',
            name: 'PPVT4',
            guid: "PP0000",
            createdDate: Date.now(),
            price: 0,
            category: "WI"
        },
         {
            id: '5',
            name: 'PPVT-V',
            guid: "PP55555",
            createdDate: Date.now(),
            price: 0,
            category: "WI"
        },
         {
            id: '6',
            name: 'KTEA A',
            guid: "KA00001",
            createdDate: Date.now(),
            price: 11,
            category: "WI"
        },
         {
            id: '7',
            name: 'KTEA B',
            guid: "W2020202020",
            createdDate: Date.now(),
            price: 45,
            category: "WI"
        },
         {
            id: '8',
            name: 'LTE',
            guid: "W2020202020",
            createdDate: Date.now(),
            price: 125,
            category: "WI"
        },
         {
            id: '9',
            name: 'GFTA',
            guid: "W2020202020",
            createdDate: Date.now(),
            price: 125,
            category: "WI"
        }
    ];

    sortBy: string;
    sortOrder: SortOrder;
     selectedRows: any[] = [];
    sort(sortEvent: GridColumnSortChangeEvent): void {
        this.sortBy = sortEvent.name;
        this.sortOrder = sortEvent.order;

    }
    paginateEvent: PageChangeEvent;

    paginate(event: PageChangeEvent): void {
        this.paginateEvent = event;
    }

    rowClickEvent: string;
    handleRowClick(event: GridRowClickEvent) : void {
        this.rowClickEvent = JSON.stringify(event, null, 5);
    }

    cellClickEvent: string;
    handleCellClick(event: GridCellClickEvent): void {
        this.cellClickEvent = JSON.stringify(event, null, 5);
    }

    getDataTable2(data: any) {
        return JSON.stringify(data, null, 5);
    }

    alert(row: any, rowIndex: any) {
        this._dlg.warning({
            message: "Saving " + row.name + " with rowIndex = " + rowIndex,
            title: 'Save'
        });
    }
}