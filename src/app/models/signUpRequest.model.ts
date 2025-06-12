export interface SignUpRequestModel {
    userName: string;
    password: string;
    email: string;
    firstName: string;
    lastName: string;
    allowEmailReminders: boolean;
  }

  export interface IdTokenRequestModel {
    IdToken : string;
  }