import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn, Validators } from '@angular/forms';
import { HelperService } from './helper.service';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {


  constructor(private helper: HelperService) { }

  passwordValidators() {
    return [Validators.required, Validators.minLength(6), //Validators.maxLength(24), 
      this.requireUpperCase(), this.requireLowerCase(), this.requireNumber(), this.requireSpecialChar()]
  }

  simplePassword() {
    return [Validators.required, Validators.minLength(6)]
  }
  
  requireUpperCase(count?: number): ValidatorFn {
    return (control: AbstractControl) => {
      let regExp = RegExp("[A-Z]{1," + (count ?? 1) + "}");
    return regExp.test(control.value) || this.nullUndefinedEmpty(control.value) ? null: { hasUpperCase: true, count: (count ?? 1) }
    }
  }

  requireLowerCase(count?: number): ValidatorFn {
    return (control: AbstractControl) => {
    let regExp = RegExp("[a-z]{1," + (count ?? 1) + "}");
    return regExp.test(control.value) || this.nullUndefinedEmpty(control.value) ? null: { hasLowerCase: true, count: (count ?? 1) }
    }
  }
  
  requireNumber(count?: number): ValidatorFn {
    return (control: AbstractControl) => {
      let regExp = RegExp("[0-9]{1," + (count ?? 1) + "}");
    return regExp.test(control.value) || this.nullUndefinedEmpty(control.value) ? null: { hasNumber: true, count: (count ?? 1) }
    }
  }

  requireSpecialChar(count?: number): ValidatorFn {
    return (control: AbstractControl) => {
      let regExp = RegExp("[^A-Za-z0-9]{1," + (count ?? 1) + "}");
    return regExp.test(control.value) || this.nullUndefinedEmpty(control.value) ? null: { hasSpecialChar: true, count: (count ?? 1) }
    }
  }

  numbersOnly(): ValidatorFn {
    return (control: AbstractControl) => {
    return /^[0-9]+$/.test(control.value) || this.nullUndefinedEmpty(control.value) ? null: { numbersOnly: true }
    }
  }

  greaterThanZero(): ValidatorFn {
    return (control: AbstractControl) => {
      let val = parseInt(control.value);
      if(isNaN(val)) return null;
    return (val > 0) || this.nullUndefinedEmpty(control.value) ? null: { greaterThanZero: true }
    }
  }

  validEmail(): ValidatorFn {
    return (control: AbstractControl) => {
    return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(control.value) || this.nullUndefinedEmpty(control.value) ? null: { validEmail: true }
    }
  } 

  nullUndefinedEmpty(value: string | undefined | null) {
    return value === null || value === undefined || value === "";
  }

  customRequired(): ValidatorFn {
    return (control: AbstractControl) => {
      console.log(control);
    return this.nullUndefinedEmpty(control.value) ? { customRequired: true } : null
    }
  }

  multiSelectRequired(): ValidatorFn {
    return (control: AbstractControl) => {
    return control.value.length == 0 ? { customRequired: true } : null
    }
  }
}
