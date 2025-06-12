export class BaseResponseModel {
    data?: any;
    isSuccess: boolean = false;
    isException : boolean = false;
    errorMessage?: string;
    errorCode?: string;
  }