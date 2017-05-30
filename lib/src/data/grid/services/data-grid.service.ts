import { Injectable } from '@angular/core';

import { GridColumnMetadata } from '../common/types/grid.column.metadata';
import { SortOrder } from '../common/enums/sort.order.enum';

/**
 * Just some helpers to act on data thats already loaded. This can be extended to http aware class
 * to do the same from a server. 
 */
@Injectable()
export class DataGridService {

    filter(data: any[], searchTerm: string, ignoreCase: boolean = false, excludedColumns?: string[]): any[] {
        let filter: string = searchTerm ? (ignoreCase ? searchTerm.toLowerCase() : searchTerm) : '';
        if (filter) {
            data = data.filter((item: any) => {
                const res: any = Object.keys(item).find((key: string) => {
                    if (!excludedColumns || excludedColumns.indexOf(key) === -1) {
                        const preItemValue: string = ('' + item[key]);
                        const itemValue: string = ignoreCase ? preItemValue.toLowerCase() : preItemValue;
                        return itemValue.indexOf(filter) > -1;
                    }
                });
                return !(typeof res === 'undefined');
            });
        }
        return data;
    }

    sort(data: any[], sortBy: string, sortOrder: SortOrder = SortOrder.ASC): any[] {
        if (sortBy) {
            data.sort((a: any, b: any) => {
                let compA: any = a[sortBy];
                let compB: any = b[sortBy];
                let direction: number = 0;
                if (!Number.isNaN(Number.parseFloat(compA)) && !Number.isNaN(Number.parseFloat(compB))) {
                    direction = Number.parseFloat(compA) - Number.parseFloat(compB);
                } else {
                    if (compA < compB) {
                        direction = -1;
                    } else if (compA > compB) {
                        direction = 1;
                    }
                }
                return direction * (sortOrder === SortOrder.DESC ? -1 : 1);
            });
        }
        return data;
    }

    paginate(data: any[], fromRow: number, toRow: number): any[] {
        if (fromRow >= 1) {
            data = data.slice(fromRow - 1, toRow);
        }
        return data;
    }
}