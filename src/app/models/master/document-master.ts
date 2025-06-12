export class DocumentMaster {
  documentID: number = 0;
  documentName: string = '';
  activeFlag: boolean = false;
  operaDocumentCode: string = '';
  boDocumentType: string = '';
  isAllowIssueCountryCheck?: boolean;
  nationalityCode?: string;
  propertyID: number = 0;
  propertyCode: string = '';
}