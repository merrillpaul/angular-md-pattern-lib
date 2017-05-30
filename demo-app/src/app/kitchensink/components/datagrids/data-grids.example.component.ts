import { Component, OnInit } from '@angular/core';


import { GridColumnMetadata, EditorType, GridColumnSortChangeEvent, SortOrder, PageChangeEvent, GridRowClickEvent } from '@pearson/angular-material';

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
    constructor() { }

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
            label: "Guid"
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

}