import { SafeResourceUrl } from "@angular/platform-browser";

export class UpsellMaster {
  //Table Variables
  upsellID: number = 0;
  code: string = '';
  name: string = '';
  description?: string;
  imageBase64?: string;
  amount: number = 0;
  isActive?: boolean;

  //Other Variables
  imageBase64Path: SafeResourceUrl | null | undefined;
}