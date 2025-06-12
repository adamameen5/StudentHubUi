export class PasswordPolicy {
  passwordPolicyID: number = 0;
  policyName: string = '';
  minLength: number = 0;
  maxLength: number = 0;
  maxAge: number = 0;
  lowerCaseCount: number = 0;
  upperCaseCount: number = 0;
  digitCount: number = 0;
  symbolCount: number = 0;
  lockoutThreshold: number = 0;
  lockoutDuration: number = 0;
}