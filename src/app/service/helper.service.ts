import { Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Breadcrumb } from '../models/breadcrumb';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(private sanitizer: DomSanitizer) { }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      } else if (control instanceof FormArray) {
        control.controls.forEach(f => {
          if (f instanceof FormGroup)
            this.validateAllFormFields(f);
          else if (f instanceof FormControl)
            f.markAsTouched({ onlySelf: true })
        })
      }
    });
  }

  nullUndefinedEmpty(value: any) {
    return value === undefined || value === null || value === "" || value.toString().trim() === "" || value === "null" || value === "undefined";
  }

  getDate(date: Date | undefined): Date | null {
    if (date == undefined)
      return null;

    return new Date(date.toString());
  }

  getImageType(base64: string | undefined | null) {
    let value = base64?.charAt(0);
    switch (value) {
      case '/':
        return 'jpg';
      case 'i':
        return 'png';
      case 'R':
        return 'gif';
      case 'U':
        return 'webp';
      case 'J':
        return 'pdf';
      case 'T':
        return 'tif';
      default:
        return 'jpg'
    }
  }

  getContentType(base64: string | undefined | null) {
    let value = base64?.charAt(0);
    switch (value) {
      case '/':
        return 'image/jpg';
      case 'i':
        return 'image/png';
      case 'R':
        return 'image/gif';
      case 'U':
        return 'image/webp';
      case 'J':
        return 'application/pdf';
      case 'T':
        return 'image/tif';
      default:
        return 'image/jpg'
    }
  }

  getCompleteBase64(base64: string) {
    if (this.nullUndefinedEmpty(base64)) return base64;
    if (base64!.includes("data:") && base64.includes("base64")) return base64;
    return 'data:' + this.getContentType(base64!) + ';base64,' + base64;
  }

  getResourceUrl(base64: string | undefined | null): SafeResourceUrl | null {
    if (this.nullUndefinedEmpty(base64)) return null;
    if (base64!.includes("data:") && base64!.includes("base64")) return this.sanitizer.bypassSecurityTrustResourceUrl(base64!);
    return this.sanitizer.bypassSecurityTrustResourceUrl('data:' + this.getContentType(base64!) + ';base64,' + base64);
  }

  getNowUTC(): Date {
    const now = new Date();
    return new Date(now.getTime() + (now.getTimezoneOffset() * 60000));
  }

  IsValidEmail(email: string | undefined | null): boolean {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test((email ?? '').trim())
  }

  followBreadcrumbs(breadcrumbs: Breadcrumb[], _breadcrumbs: Breadcrumb[]): Breadcrumb[] {
    let index = breadcrumbs.findIndex(f => f.link == _breadcrumbs.at(0)?.link);
    if (index >= 0) {
      _breadcrumbs = breadcrumbs.slice(0, (index + 1));
    } else {
      _breadcrumbs = breadcrumbs.concat(_breadcrumbs);
    }
    return _breadcrumbs;
  }

  getShortDesc(desc: string | null | undefined): string {
    let maxLength = 15;
    if (this.nullUndefinedEmpty(desc))
      return '';

    if (desc!.length <= maxLength)
      return desc ?? '';

    return desc!.substring(0, maxLength) + '..'
  }

  removeBase64(base64: string) {
    var val = "";
    if (!this.nullUndefinedEmpty(base64)) {
      let index = base64.indexOf("base64,");
      val = base64.substring(index + 7, base64.length);
    }
    return val;
  }

  getNumberName(n: number) {
    if (n < 0)
      return false;

    // Arrays to hold words for single-digit, double-digit, and below-hundred numbers
    let single_digit = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'Nine']
    let double_digit = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'Nineteen']
    let below_hundred = ['twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'Ninety']

    if (n === 0) return 'Zero';

    // Recursive function to translate the number into words
    function translate(n: number): string {
      let word = "";
      if (n < 10) {
        word = single_digit[n] + ' ';
      } else if (n < 20) {
        word = double_digit[n - 10] + ' ';
      } else if (n < 100) {
        let rem = translate(n % 10);
        word = below_hundred[(n - n % 10) / 10 - 2] + ' ' + rem;
      } else if (n < 1000) {
        word = single_digit[Math.trunc(n / 100)] + ' Hundred ' + translate(n % 100);
      } else if (n < 1000000) {
        word = translate((n / 1000)).trim() + ' Thousand ' + translate(n % 1000);
      } else if (n < 1000000000) {
        word = translate((n / 1000000)).trim() + ' Million ' + translate(n % 1000000);
      } else {
        word = translate((n / 1000000000)).trim() + ' Billion ' + translate(n % 1000000000);
      }
      return word;
    }

    // Get the result by translating the given number
    let result = translate(n);
    return result.trim();
  }
}
