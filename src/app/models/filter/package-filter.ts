import { PaginationBaseFilter } from "./pagination-base-filter";

export class PackageFilter extends PaginationBaseFilter {
  packageCode?: string;
  activeFlag?: boolean;
  packageType?: string;
  calculationRule?: string;
  isMealPlan?: boolean;
  mealPlanCode?: string;
}