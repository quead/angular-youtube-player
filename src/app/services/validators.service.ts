import { Injectable } from '@angular/core';
import { ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class NumberVal {
  constructor() {}

  static max(max: number): ValidatorFn {
    return (control: any): { [key: string]: boolean } | null => {
      const val: number = control.value;
      if (control.pristine || control.pristine) {
        return null;
      }
      if (val <= max) {
        return null;
      }
      return { max: true };
    };
  }

  static min(min: number): ValidatorFn {
    return (control: any): { [key: string]: boolean } | null => {
      const val: number = control.value;
      if (control.pristine || control.pristine) {
        return null;
      }
      if (val >= min) {
        return null;
      }
      return { min: true };
    };
  }

  static isNumber(): ValidatorFn {
    return (control: any): { [key: string]: boolean } | null => {
      const valid = /\d{0,9}/.test(control.value);
      if (valid) {
        return null;
      }
      return { invalid: true };
    };
  }
}
