export interface PageChangeEvent {
  page: number;
  maxPage: number;
  pageSize: number;
  total: number;
  fromRow: number;
  toRow: number;
}