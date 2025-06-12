import { PaginationBaseFilter } from "./pagination-base-filter";

export class MultiLanguageFilter extends PaginationBaseFilter {
  languageCode?: string;
  textName?: string;
}