import { PaginationBaseFilter } from "./pagination-base-filter";

export class CountryMasterFilter extends PaginationBaseFilter {
  countryName?: string;
  twoCountryCode?: string;
  countryCode?: string;
  pmsCountryCode?: string;
  isActive?: string;
}