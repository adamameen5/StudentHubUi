import { Component } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/service/user.service';
import { toggleAnimation } from 'src/app/shared/animations';
import Swal from 'sweetalert2';

@Component({
    templateUrl: './profile.html',
    animations: [toggleAnimation],
})
export class ProfileComponent {
    userId: number = Number(localStorage.getItem('userId'));
    userDetails: User = new User();
    profilePictureUrl: string = "./assets/images/no-profilepic.png";

    constructor(
        private userService: UserService
    ) {
        this.loadUserDetails();
    }

    loadUserDetails(): void {
        this.userService.getUserById(this.userId).subscribe(
            response => {
                if (response.isSuccess) {
                    this.userDetails = response.data;
                    this.profilePictureUrl = response.data.profileImageUrl || '/assets/images/no-profilepic.png';
                }
            }
        );
    }

    addNewCard(): void {
        Swal.fire({
            title: 'Add New Card',
            text: 'Add New Card functionality is not yet available. Currently we provide only free plan.',
            icon: 'info',
            confirmButtonText: 'OK'
        });
    }

    upgrade(): void {
        Swal.fire({
            title: 'Upgrade',
            text: 'Upgrade functionality is not yet available. Currently we provide only free plan.',
            icon: 'info',
            confirmButtonText: 'OK'
        });
    }

    onImageError(event: Event) {
        const img = event.target as HTMLImageElement;
        img.src = '/assets/images/no-profilepic.png';
    }
}
