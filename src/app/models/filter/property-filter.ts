import { PaginationBaseFilter } from "./pagination-base-filter";

export class PropertyFilter extends PaginationBaseFilter {
  propertyName?: string;
  mobile?: string;
  webSite?: string;
  address?: string;
  email?: string;
  licenseCode?: string;
  pms?: string;
  paymentVendor?: string;
  keyVendor?: string;
}