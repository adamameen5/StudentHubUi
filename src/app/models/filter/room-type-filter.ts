import { PaginationBaseFilter } from "./pagination-base-filter";

export class RoomTypeFilter extends PaginationBaseFilter {
  roomTypeCode?: string;
  roomTypeName?: string;
  rateCode?: string;
}