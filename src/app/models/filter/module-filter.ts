import { PaginationBaseFilter } from "./pagination-base-filter";

export class ModuleFilter extends PaginationBaseFilter {
  moduleName?: string;
  moduleCode?: string;
  isActive?: boolean;
}