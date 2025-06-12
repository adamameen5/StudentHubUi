export class PackageMaster {
  packageID: number = 0;
  packageCode: string = '';
  description: string = '';
  qty: number = 0;
  amount: number = 0;
  activeFlag: boolean = false;
  packageType: string = '';
  calculationRule: string = '';
  isMealPlan: boolean = false;
  mealPlanCode?: string;
  propertyID: number = 0;
  propertyCode: string = '';
}