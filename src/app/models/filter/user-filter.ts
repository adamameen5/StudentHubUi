import { PaginationBaseFilter } from "./pagination-base-filter";

export class UserFilter extends PaginationBaseFilter {
  isSuperAdmin?: boolean;
  userId?: number;
  username?: string;
  isActive?: string;
  roleID?: number;
  propertyName?: string;
}