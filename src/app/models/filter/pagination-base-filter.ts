export class PaginationBaseFilter {
  pageSize?: number = 10;
  pageNum?: number = 1;
  pageCount?: number;
  sortDescending?: string;
  sortHeader?: string;
  propertyCode?: string;
  primaryID?: number;
}