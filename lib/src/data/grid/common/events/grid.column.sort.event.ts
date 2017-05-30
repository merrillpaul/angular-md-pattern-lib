import { SortOrder } from './../enums/sort.order.enum';

export interface GridColumnSortChangeEvent {
  order: SortOrder;
  name: string;
}