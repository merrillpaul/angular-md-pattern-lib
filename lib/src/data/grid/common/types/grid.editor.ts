import { EditorType } from './../enums/editor.type.enum';
import { ListItems } from './grid.list.items';

export interface GridEditorType {
    type: EditorType;
    items?: ListItems[];
}