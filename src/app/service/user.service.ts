import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig } from '../class/app-confg';
import { BehaviorSubject, Observable } from 'rxjs';
import { PaginationBaseFilter } from '../models/filter/pagination-base-filter';
import { HelperService } from './helper.service';
import { Role } from '../models/role';
import { User } from '../models/user';
import { UserPermission } from '../models/user-permission';
import { UserProperty } from '../models/user-property';
import { GeneralResponse } from '../models/generalResponse.model';
import { environment } from 'src/environments/environment';
import { BaseResponseModel } from '../models/baseResponse.model';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    url: string = "";
    private userProfileSubject = new BehaviorSubject<any>(null);
    userProfile$ = this.userProfileSubject.asObservable();

    constructor(
        private http: HttpClient,
        private config: AppConfig,
        private helper: HelperService
    ) {
        this.url = environment.apiURL + '/api/User';
    }

    getUserCount(): Observable<GeneralResponse<number>> {
        return this.http.get<GeneralResponse<number>>(`${this.url}/count`);
    }

    updateUserDetails(userDetails: {
        id: number;
        firstName: string;
        lastName: string;
        email: string;
        address: string;
        country: string;
        phone: string;
        allowEmailReminders: boolean;
    }): Observable<BaseResponseModel> {
        return this.http.put<BaseResponseModel>(`${this.url}/update`, userDetails);
    }

    updateUserDetailsWithProfilePicture(formData: FormData): Observable<BaseResponseModel> {
        return this.http.put<BaseResponseModel>(`${this.url}/updateuserwithprofilepicture`, formData).pipe(
            tap(response => {
                if (response.isSuccess && response.data) {
                    this.userProfileSubject.next(response.data); // Update profile after successful save
                }
            })
        );
    }

    getAllUsers(filter: PaginationBaseFilter): Observable<GeneralResponse<User[]>> {
        return this.http.post<GeneralResponse<User[]>>(`${this.url}/GetUsers`, filter);
    }

    getUserById(id: number): Observable<BaseResponseModel> {
        return this.http.get<BaseResponseModel>(`${this.url}/getUserById/${id}`).pipe(
            tap(response => {
                if (response.isSuccess && response.data) {
                    this.userProfileSubject.next(response.data); // Update profile after fetch
                }
            })
        );
    }

    deleteUser(id: number): Observable<GeneralResponse<boolean>> {
        return this.http.delete<GeneralResponse<boolean>>(`${this.url}/DeleteUserById/${id}`);
    }

    addUser(user: User): Observable<GeneralResponse<User>> {
        return this.http.post<GeneralResponse<User>>(`${this.url}/AddUser`, user);
    }

    setProfileCompletedToTrue(userId: number): Observable<GeneralResponse<boolean>> {
        return this.http.put<GeneralResponse<boolean>>(`${this.url}/SetProfileCompletedToTrue/?userId=${userId}`, null);
    }

    getUsersInWorkspace(workspaceId: number): Observable<BaseResponseModel> {
        return this.http.get<BaseResponseModel>(`${this.url}/GetUsersInWorkspace/${workspaceId}`);
    }

    getUsersInWorkspaceByTask(taskId: number, userId: number): Observable<BaseResponseModel> {
        return this.http.get<BaseResponseModel>(`${this.url}/GetUsersInWorkspaceByTask?taskId=${taskId}&userId=${userId}`);
    }

    // Optional: Manually update profile
    updateUserProfile(user: any): void {
        this.userProfileSubject.next(user);
    }

    //get user by username
    getUserByUsername(username: string): Observable<GeneralResponse<User>> {
        return this.http.get<GeneralResponse<User>>(`${this.url}/GetUserByUsername/${username}`);
    }

    //add user to workspace by passing userId in body
    addUserToWorkspace(userId: number): Observable<GeneralResponse<boolean>> {
        var body = {
            userId: userId
        };
        return this.http.post<GeneralResponse<boolean>>(`${this.url}/AddUserToWorkspace`, body);
    }
}