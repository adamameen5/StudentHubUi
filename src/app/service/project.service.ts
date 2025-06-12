import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConfig } from '../class/app-confg';
import { HelperService } from './helper.service';
import { environment } from 'src/environments/environment';
import { BaseResponseModel } from '../models/baseResponse.model';

@Injectable({
    providedIn: 'root',
})
export class ProjectService {
    url: string = "";

    constructor(
        private http: HttpClient,
        private config: AppConfig,
        private helper: HelperService) {
        this.url = environment.apiURL + "/api/Project/";
    }

    createProject(projectData: FormData): Observable<BaseResponseModel> {
        return this.http.post<BaseResponseModel>(`${this.url}CreateProject`, projectData);
    }

    getProjects(): Observable<BaseResponseModel> {
        return this.http.get<BaseResponseModel>(this.url + 'GetProjects');
    }

    updateProject(projectData: FormData): Observable<BaseResponseModel> {
        const id = projectData.get('id');
        return this.http.put<BaseResponseModel>(`${this.url}UpdateProject/${id}`, projectData);
    }

    getProjectDetails(projectId: number): Observable<BaseResponseModel> {
        return this.http.get<BaseResponseModel>(this.url + `GetProjectDetails/${projectId}`);
    }

    addProjectCollaborator(collaboratorData: any): Observable<BaseResponseModel> {
        var requestBody = { AddProjectCollaboratorRequest: collaboratorData };
        return this.http.post<BaseResponseModel>(this.url + 'AddProjectCollaborator', collaboratorData);
    }
}
