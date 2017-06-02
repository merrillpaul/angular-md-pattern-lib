import { GridEditorType } from './grid.editor';

export interface GridColumnMetadata {
    name: string;
    label: string;
    tooltip?: string;
    format?: (value: any) => any;
    sortable?: boolean;
    hidden?: boolean;
    filter?: boolean;
    editable?:boolean;
    editor?: GridEditorType;
    nested?:boolean;
    width?:string;
}