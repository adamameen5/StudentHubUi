import { BaseResponseModel } from "./baseResponse.model";

export interface GeneralResponse<T> extends BaseResponseModel {
  result: boolean;
  message: string;
  data: T;
  meta?: {
    totalItems: number;
    pageNumber: number;
    pageSize: number;
    totalPages: number;
  };
}