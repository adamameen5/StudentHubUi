import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime, first } from 'rxjs';
import { SignUpRequestModel } from 'src/app/models/signUpRequest.model';
import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/service/account.service';
import { HelperService } from 'src/app/service/helper.service';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';

@Component({
    templateUrl: './user-account-settings.html',
    styleUrls: ['./user-account-settings.css']
})
export class UserAccountSettingsComponent implements OnInit {
    activeTab = 'home';
    userId: number = Number(localStorage.getItem('userId'));
    userDetails: User = new User();
    generalInformationForm: FormGroup = this.formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        allowEmailReminders: [false],
        phone: ['', Validators.required],
        address: ['', Validators.required],
        country: ['', Validators.required]
    });
    selectedFile: File | null = null;
    profilePictureUrl: string = "./assets/images/no-profilepic.png";
    isHovered: { [key: string]: boolean } = {
        'payment-detail': false,
        preferences: false,
        'danger-zone': false,
    };
    workspaceUserForm: FormGroup = this.formBuilder.group({
        username: ['']
    });
    usernameValid: boolean = false;
    enteredUserId: number = 0;
    usersInWorkspace: User[] = [];

    constructor(
        private userService: UserService,
        private formBuilder: FormBuilder,
        private accountService: AccountService,
        private helper: HelperService,

    ) {
        this.loadUserDetails();
    }

    ngOnInit(): void {
        this.workspaceUserForm.controls['username'].valueChanges
            .pipe(debounceTime(1000)) // Wait 1 second after user stops typing
            .subscribe(value => {
                this.checkUsername(value);
            });
        this.loadWorkspaceUsers();
    }

    loadUserDetails(): void {
        this.userService.getUserById(this.userId).subscribe(
            response => {
                if (response.isSuccess) {
                    this.userDetails = response.data;
                    this.profilePictureUrl = response.data.profileImageUrl || '/assets/images/no-profilepic.png';
                    this.generalInformationForm.patchValue(this.userDetails);
                }
            }
        );
    }

    signUp() {
        if (this.generalInformationForm.valid) {
            const formData = new FormData();
            formData.append('id', this.userId.toString());
            formData.append('firstName', this.generalInformationForm.value.firstName);
            formData.append('lastName', this.generalInformationForm.value.lastName);
            formData.append('email', this.generalInformationForm.value.email);
            formData.append('address', this.generalInformationForm.value.address || '');
            formData.append('country', this.generalInformationForm.value.country || '');
            formData.append('phone', this.generalInformationForm.value.phone || '');
            formData.append('allowEmailReminders', this.generalInformationForm.value.allowEmailReminders.toString());
            if (this.selectedFile) {
                formData.append('profileImage', this.selectedFile, this.selectedFile.name);
            }

            this.userService.updateUserDetailsWithProfilePicture(formData).subscribe(
                (response: any) => {
                    if (response.isSuccess) {
                        Swal.fire({
                            title: 'Saved successfully',
                            padding: '2em',
                            customClass: {
                                popup: 'sweet-alerts',
                            }
                        }).then(() => {
                            this.userService.setProfileCompletedToTrue(this.userId).subscribe(
                                (response: any) => {
                                    if (response.result) {
                                        console.log('Profile completed');
                                    }
                                }
                            );
                        });
                    } else {
                        const toast = Swal.mixin({
                            toast: true,
                            position: 'top-end',
                            showConfirmButton: false,
                            timer: 3000,
                        });
                        toast.fire({
                            icon: 'error',
                            title: 'Error while saving',
                            padding: '10px 20px',
                        });
                    }
                },
                (error) => {
                    console.error('Error updating profile:', error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Failed to update profile.',
                    });
                }
            );
        }
    }

    onFileSelected(event: Event): void {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files[0]) {
            const file = input.files[0];
            const maxSize = 5 * 1024 * 1024; // 5MB
            if (file.size > maxSize) {
                Swal.fire({
                    icon: 'error',
                    title: 'File too large',
                    text: 'Please select an image smaller than 5MB.',
                });
                return;
            }
            if (!file.type.match('image/(jpeg|png)')) {
                Swal.fire({
                    icon: 'error',
                    title: 'Invalid file type',
                    text: 'Please select a JPEG or PNG image.',
                });
                return;
            }
            this.selectedFile = file;
            const reader = new FileReader();
            reader.onload = (e: any) => {
                this.profilePictureUrl = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    }

    isBase64(url: string | null): boolean {
        return url ? url.startsWith('data:image/') : false;
    }

    addWorkspaceUser() {
        const username = this.workspaceUserForm.value.username;
        if (username && username.trim() !== '' && this.enteredUserId != 0) {
            this.userService.addUserToWorkspace(this.enteredUserId).subscribe(
                (response: any) => {
                    if (response.isSuccess) {
                        Swal.fire({
                            title: 'User added to workspace successfully',
                            padding: '2em',
                            customClass: {
                                popup: 'sweet-alerts',
                            }
                        });
                        this.loadWorkspaceUsers();
                        this.workspaceUserForm.reset();
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'Failed to add user to workspace.',
                        });
                    }
                }
            );
        }
    }

    checkUsername(username: string) {
        if (username && username.trim() !== '') {
            this.userService.getUserByUsername(username).subscribe(
                (response: any) => {
                    if (response.isSuccess && response.data) {
                        this.usernameValid = true;
                        this.enteredUserId = response.data.id;
                    } else {
                        this.usernameValid = false;
                    }
                },
                (error) => {
                    console.error('Error checking username:', error);
                    this.usernameValid = false;
                }
            );
        } else {
            this.usernameValid = false;
        }
    }

    loadWorkspaceUsers(): void {
        this.userService.getUsersInWorkspace(Number(localStorage.getItem('workspaceId'))).subscribe((res) => {
            this.usersInWorkspace = res.data;
        });
    }

    onImageError(event: Event) {
        const img = event.target as HTMLImageElement;
        img.src = '/assets/images/no-profilepic.png';
    }
}
