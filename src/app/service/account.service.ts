import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AppConfig } from '../class/app-confg';
import { catchError, map, Observable, throwError } from 'rxjs';
import { TokenResponseModel } from '../models/token/token-response-model';
import { UserPermission } from '../models/user-permission';
import { Router } from '@angular/router';
import { LoginRequestModel } from '../models/login-request-model';
import { IdTokenRequestModel, SignUpRequestModel } from '../models/signUpRequest.model';
import { SignUpResponseModel } from '../models/signupResponse.model';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { BaseResponseModel } from '../models/baseResponse.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  url: string = "";
  viewAllowedList: string[] = [];
  addAllowedList: string[] = [];
  editAllowedList: string[] = [];
  deleteAllowedList: string[] = [];


  constructor(
    private http: HttpClient,
    private config: AppConfig,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.url = environment.apiURL + "/api/Login/";
  }

  // Login(tokenRequest: TokenRequestModel): Observable<TokenResponseModel> {
  //   return this.http.post<TokenResponseModel>(this.url + "GenerateToken", tokenRequest).pipe(
  //     map((response) => {
  //       if (response.result) {
  //         localStorage.setItem("token", response.token);
  //         localStorage.setItem("userPermissions", response.userPermissions);
  //         this.setUserPermissions(response.userPermissions);

  //         if (!response.result || this.viewAllowedList.length == 0) {
  //           this.toastr.error('Unauthorized');

  //         } else {
  //           let landingPage = '';
  //           if(!this.viewAllowedList.includes('Reservation')) {
  //             var viewModule = this.viewAllowedList[0];
  //             switch(viewModule) {
  //               case 'CheckinCheckoutReport':
  //                 landingPage = 'checkin-checkout-report';
  //                 break;
  //               case 'Country':
  //                 landingPage = 'country-master';
  //                 break;
  //               case 'DocumentMaster':
  //                 landingPage = 'document-type-config';
  //                 break;
  //               case 'FieldMaster':
  //                 landingPage = 'field-list';
  //                 break;
  //               case 'Kiosk':
  //                 landingPage = 'kiosk-master';
  //                 break;
  //               case 'DeviceConfig':
  //                 landingPage = 'kiosk-parameters';
  //                 break;
  //               case 'Language':
  //                 landingPage = 'language-master';
  //                 break;
  //               case 'ManualAuth':
  //                 landingPage = 'manual-auth';
  //                 break;
  //               case 'Module':
  //                 landingPage = 'module';
  //                 break;
  //               case 'MultiLanguage':
  //                 landingPage = 'multi-language-settings';
  //                 break;
  //               case 'Package':
  //                 landingPage = 'package-config';
  //                 break;
  //               case 'PasswordPolicy':
  //                 landingPage = 'password-policy';
  //                 break;
  //               case 'Profile':
  //                 landingPage = 'manage-reservations';
  //                 break;
  //               case 'Property':
  //                 landingPage = 'property';
  //                 break;
  //               case 'Reservation':
  //                 landingPage = 'manage-reservations';
  //                 break;
  //               case 'Role':
  //                 landingPage = 'role-master';
  //                 break;
  //               case 'RoomType':
  //                 landingPage = 'room-type-config';
  //                 break;
  //               case 'SettingsParameter':
  //                 landingPage = 'settings-parameter';
  //                 break;
  //               case 'Step':
  //                 landingPage = 'step';
  //                 break;
  //               case 'UDFMaster':
  //                 landingPage = 'udf-config';
  //                 break;
  //               case 'User':
  //                 landingPage = 'user';
  //                 break;
  //               case 'PrecheckinReport':
  //                 landingPage = 'precheckin-report';
  //                 break;
  //               default:
  //                 landingPage = '';
  //             }
  //           }
  //           let baseUrl = location.pathname;
  //           // location.replace(baseUrl.replace('login', landingPage));
  //           this.router.navigate([landingPage]);
  //           this.toastr.success("Login successful");
  //         }
  //       }
  //       return response
  //     })
  //   )
  // }  

  Login(loginRequest: LoginRequestModel): Observable<BaseResponseModel> {
    return this.http.post<BaseResponseModel>(this.url + "login", loginRequest).pipe(
      map((response: BaseResponseModel) => {
        return response;
      }),
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  signUp(signUpRequest: SignUpRequestModel): Observable<BaseResponseModel> {
    return this.http.post<BaseResponseModel>(this.url + 'signup', signUpRequest).pipe(
      map((response: BaseResponseModel) => {
        return response;
      }),
      catchError((error) => {
        return error.errorMessage ? throwError(() => error.error.errorMessage) : throwError(() => error);
      })
    );
  }

  saveTokenId(signUpRequest: IdTokenRequestModel): Observable<boolean> {
    return this.http.post<boolean>(this.url + 'save-id-token', signUpRequest).pipe(
      map((response: boolean) => {
        return response;
      }),
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  handleSuccessfulLogin(): void {
    // Handle the response here, e.g., storing the token and navigating
    // localStorage.setItem("token", response.token);
    // localStorage.setItem("userPermissions", JSON.stringify(response.userPermissions));
    // this.setUserPermissions(response.userPermissions);

    let landingPage = '/dashboard'; // Default landing page

    // If there is a specific landing page logic based on user permissions
    // this logic can be added here
    // if (!this.viewAllowedList.includes('Reservation')) {
    //   // Add your logic here to determine the landing page based on user permissions
    // }

    this.router.navigate([landingPage]);
    this.toastr.success("Login successful");
  }

  setUserPermissions(userPermissionsStr: string) {
    this.addAllowedList = [];
    this.editAllowedList = [];
    this.viewAllowedList = [];
    this.deleteAllowedList = [];
    if (userPermissionsStr == '')
      userPermissionsStr = localStorage.getItem("userPermissions")!;
    var userPermissions: UserPermission = JSON.parse(userPermissionsStr!);
    for (const [key, value] of Object.entries(userPermissions)) {
      var valueObj = value.split(',');
      var addAllowed = valueObj[0] === '1' ? true : false;
      var editAllowed = valueObj[1] === '1' ? true : false;
      var viewAllowed = valueObj[2] === '1' ? true : false;
      var deleteAllowed = valueObj[3] === '1' ? true : false;

      if (addAllowed) {
        this.addAllowedList.push(key)
      }
      if (editAllowed) {
        this.editAllowedList.push(key)
      }
      if (viewAllowed) {
        this.viewAllowedList.push(key)
      }
      if (deleteAllowed) {
        this.deleteAllowedList.push(key)
      }
    }
  }
}
