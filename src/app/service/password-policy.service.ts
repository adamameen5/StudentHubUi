import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig } from '../class/app-confg';
import { Observable } from 'rxjs';
import { GeneralResponse } from '../models/generalResponse.model';
import { PaginationBaseFilter } from '../models/filter/pagination-base-filter';
import { HelperService } from './helper.service';
import { PasswordPolicy } from '../models/password-policy';
import { Option } from '../models/option';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PasswordPolicyService {
  url: string = "";

  constructor(private http: HttpClient, private config: AppConfig, private helper: HelperService) { 
    this.url = environment.apiURL + "/api/PasswordPolicy/";
  }

  //#region step
  GetPasswordPolicies(filter: PaginationBaseFilter): Observable<GeneralResponse<any>> {
    return this.http.post<GeneralResponse<any>>(this.url + "GetPasswordPolicies", filter);
  }

  AddPasswordPolicy(requests: PasswordPolicy) {
    return this.http.post<GeneralResponse<any>>(this.url + "AddPasswordPolicy", requests);
  }

  EditPasswordPolicy(requests: PasswordPolicy) {
    return this.http.post<GeneralResponse<any>>(this.url + "EditPasswordPolicy", requests);
  }

  DeletePasswordPolicy(stepIDs: string) {
    return this.http.delete<GeneralResponse<any>>(this.url + "DeletePasswordPolicy?PasswordPolicyID=" + stepIDs);
  }

  GetPasswordPolicyOptions() {
    return this.http.get<Option[]>(this.url + "GetPasswordPolicyOptions");
  }

  GetPasswordPolicy(passwordPolicyID: number): Observable<GeneralResponse<any>> {
    var filter: PaginationBaseFilter = {
      pageNum: 1,
      pageSize: 1,
      sortDescending: "ASC",
      sortHeader: "PasswordPolicyID",
      primaryID: passwordPolicyID
    };
    return this.http.post<GeneralResponse<any>>(this.url + "GetPasswordPolicy", filter);
  }
  //#endregion
}