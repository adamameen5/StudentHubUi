import { BaseResponseModel } from "../baseResponse.model";

export class TokenResponseModel  extends BaseResponseModel {
  token: string = "";
  userPermissions: string = "";
  licenseCode: string = "";
  propertyCode: string = "";
  firstName: string = "";
  lastName: string = "";
}
