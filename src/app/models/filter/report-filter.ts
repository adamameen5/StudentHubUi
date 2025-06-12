import { PaginationBaseFilter } from "./pagination-base-filter";

export class ReportFilter extends PaginationBaseFilter{
  startDate?: Date;
  endDate?: Date;
  type?: number;
}