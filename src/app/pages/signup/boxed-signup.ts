import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { toggleAnimation } from 'src/app/shared/animations';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { AppService } from 'src/app/service/app.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignUpRequestModel } from '../../models/signUpRequest.model';
import { AccountService } from '../../service/account.service';
import { HelperService } from '../../service/helper.service';
import Swal from 'sweetalert2';
declare const google: any; // Declare Google as external library

@Component({
  templateUrl: './boxed-signup.html',
  animations: [toggleAnimation],
})
export class BoxedSignupComponent implements OnInit, OnDestroy {
  store: any;
  signUpForm: FormGroup = this.formBuilder.group({
    userName: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    password: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    allowEmailReminders: [false],
  });

  isSubmitForm4 = false;
  isSignInButtonDisabled = false;
  currYear: number = new Date().getFullYear();
  passwordFieldType: 'password' | 'text' = 'password';

  constructor(
    public translate: TranslateService,
    public storeData: Store<any>,
    public router: Router,
    private appSetting: AppService,
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private helper: HelperService
  ) {
    this.initStore();
  }

  ngOnInit(): void {
    // Initialize Google Sign-In
    // @ts-ignore
    google.accounts.id.initialize({
      client_id: "848408122949-nj24jibs3m8fm7a3ia52l49ttnqu8qv4.apps.googleusercontent.com",
      callback: this.handleCredentialResponse.bind(this),
      auto_select: false,
      cancel_on_tap_outside: true,

    });

    // Render Google Sign-In button
    this.renderGoogleButton();
  }

  renderGoogleButton(): void {
    const googleButton = document.getElementById('googleSignUpButton');
    if (googleButton) {
      // Render button via Google API
      // @ts-ignore
      google.accounts.id.renderButton(googleButton, {
        theme: 'outline',
        size: 'large',
        width: '100%',
      });
    }
  }

  handleCredentialResponse(response: any): void {
    const credential = response.credential;

    // Decode JWT Token to Get User Info
    const payload = JSON.parse(atob(credential.split('.')[1]));
    const firstName = payload.given_name;
    const lastName = payload.family_name;
    const email = payload.email;

    // Autofill the Form
    this.signUpForm.patchValue({
      firstName: firstName || '',
      lastName: lastName || '',
      email: email || '',
    });

    console.log('Google User Info:', { firstName, lastName, email });

    // Send token to server
    this.accountService.saveTokenId({ IdToken: credential }).subscribe(response => {
    });
  }

  ngOnDestroy(): void {
    // Clean up Google button
    const googleButton = document.getElementById('googleSignUpButton');
    if (googleButton) {
      googleButton.innerHTML = ''; // Clear the button to avoid conflicts
    }
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

  signUp() {
    this.isSubmitForm4 = true;
    this.isSignInButtonDisabled = true;
    if (this.signUpForm.valid) {
      const signUpRequest: SignUpRequestModel = {
        userName: this.signUpForm.value.userName,
        password: this.signUpForm.value.password,
        email: this.signUpForm.value.email,
        firstName: this.signUpForm.value.firstName,
        lastName: this.signUpForm.value.lastName,
        allowEmailReminders: this.signUpForm.value.allowEmailReminders,
      };

      this.accountService.signUp(signUpRequest).subscribe(
        response => {
          if (response.isSuccess) {
            // Show success toast and navigate to login
            this.isSignInButtonDisabled = false;
            const toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
            });
            toast.fire({
              icon: 'success',
              title: 'Sign up successful, please check your email for first time login link.',
              padding: '10px 20px',
            });
            this.router.navigate(['/login']);
          } else {
            this.isSignInButtonDisabled = false;
            // Show failure toast
            const toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
            });
            toast.fire({
              icon: 'error',
              title: response.errorMessage || 'Sign up failed. Please try again later.',
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
            title: 'Sign up failed. Please try again later.',
            padding: '10px 20px',
          });
          console.log('Error signing up user', error);
        }
      );
    } else {
      this.helper.validateAllFormFields(this.signUpForm);
      return;
    }
  }

  togglePasswordVisibility() {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }
}
