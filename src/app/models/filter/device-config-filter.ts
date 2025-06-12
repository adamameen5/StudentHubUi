import { PaginationBaseFilter } from "./pagination-base-filter";

export class DeviceConfigFilter extends PaginationBaseFilter {
  kioskID?: number;
  kioskName?: string;
}