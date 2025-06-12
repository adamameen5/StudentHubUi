import { PaginationBaseFilter } from "./pagination-base-filter";

export class ReservationFilter extends PaginationBaseFilter {
  PMSConfirmationNo?: string;
  ReservationStatus?: string;
  RoomNo?: string;
  StartDate?: Date;
  EndDate?: Date;
  PMSProfileID?: string;
  GuestName?: string;
  PropertyCode?: string;
  IsPrecheckinDone?: boolean;
}