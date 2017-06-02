import { IterableChangeRecord } from '@angular/core';
export class GridRowsAddedEvent {
    constructor(public changeRecord: IterableChangeRecord<any>) {}
}