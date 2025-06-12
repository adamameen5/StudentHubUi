import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { toggleAnimation } from 'src/app/shared/animations';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { AppService } from 'src/app/service/app.service';
import { AuthService } from '../../service/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AccountService } from '../../service/account.service';
import Swal from 'sweetalert2';
declare const google: any; // Declare Google as external library

@Component({
    templateUrl: './boxed-signin.html',
    animations: [toggleAnimation],
})
export class BoxedSigninComponent implements OnInit, AfterViewInit, OnDestroy {
    loginForm: FormGroup = this.formBuilder.group({
        userName: '',
        password: ''
    });

    store: any;
    isSignInButtonDisabled = false;
    passwordFieldType: string = 'password';
    currYear: number = new Date().getFullYear();

    constructor(
        public translate: TranslateService,
        public storeData: Store<any>,
        public router: Router,
        private appSetting: AppService,
        private authService: AuthService,
        private formBuilder: FormBuilder,
        private accountService: AccountService
    ) {
        this.initStore();
    }

    ngOnInit(): void {
        this.reloadGoogleScript();
      }
    
      ngAfterViewInit(): void {
        this.renderGoogleButton();
      }
    
      renderGoogleButton(): void {
        const googleButton = document.getElementById('googleSignInButton');
        if (googleButton) {
          google.accounts.id.initialize({
            client_id: '848408122949-nj24jibs3m8fm7a3ia52l49ttnqu8qv4.apps.googleusercontent.com',
            callback: (response: any) => this.handleCredentialResponse(response),
          });
    
          google.accounts.id.renderButton(googleButton, {
            theme: 'outline',
            size: 'large',
            type: 'standard',
          });
    
          console.log('Google Sign-In button rendered');
        } else {
          console.error('Google button container not found');
        }
      }
    
      handleCredentialResponse(response: any): void {
        console.log('Google Credential Response:', response);
        // Handle authentication
      }
    
      ngOnDestroy(): void {
        const googleButton = document.getElementById('googleSignInButton');
        if (googleButton) {
          googleButton.innerHTML = ''; // Clear previous Google Sign-In button
        }
      }

      reloadGoogleScript(): void {
        const scriptId = 'googleSignInScript';
        let script = document.getElementById(scriptId) as HTMLScriptElement;
      
        if (script) {
          script.remove(); // Remove existing script
        }
      
        script = document.createElement('script');
        script.id = scriptId;
        script.src = 'https://accounts.google.com/gsi/client';
        script.async = true;
        document.head.appendChild(script);
      
        script.onload = () => {
          this.renderGoogleButton(); // Reinitialize the button after script reloads
        };
      }

    async initStore() {
        this.storeData
            .select((d) => d.index)
            .subscribe((d) => {
                this.store = d;
            });
    }

    changeLanguage(item: any) {
        this.translate.use(item.code);
        this.appSetting.toggleLanguage(item);
        if (this.store.locale?.toLowerCase() === 'ae') {
            this.storeData.dispatch({ type: 'toggleRTL', payload: 'rtl' });
        } else {
            this.storeData.dispatch({ type: 'toggleRTL', payload: 'ltr' });
        }
        window.location.reload();
    }

    login() {
        this.isSignInButtonDisabled = true;
        this.accountService.Login(this.loginForm.value).subscribe(
            response => {
                this.isSignInButtonDisabled = false;
                if (response.isSuccess) {
                    this.authService.login(response.data.token, response.data.userName, response.data.workSpaceId, response.data.userId, response.data.firstName, response.data.lastName);
                    this.accountService.handleSuccessfulLogin();
                    this.router.navigate(['/home']);
                    const toast = Swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                    });
                    toast.fire({
                        icon: 'success',
                        title: 'Signed in successfully',
                        padding: '10px 20px',
                    });
                } 
                else {
                    const toast = Swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                    });
                    toast.fire({
                        icon: 'error',
                        title: 'Invalid credentials',
                        padding: '10px 20px',
                    });
                }
            },
            error => {
                // Handle the error and show a toast message
                this.isSignInButtonDisabled = false;
                const toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                });
                toast.fire({
                    icon: 'error',
                    title: 'Connection failed. Please try again later.',
                    padding: '10px 20px',
                });
            }
        );
    }

    togglePasswordVisibility() {
        this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
    }
}
