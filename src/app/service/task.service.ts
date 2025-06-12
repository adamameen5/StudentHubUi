import { HttpClient } from "@angular/common/http";
import { map, Observable } from "rxjs";
import { GeneralResponse } from "../models/generalResponse.model";
import { Task } from "../models/ObjectModels/task.model";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    url: string = "";
    constructor(private http: HttpClient) {
        this.url = environment.apiURL + "/api/Task/";
    }

    createTask(task: Task): Observable<GeneralResponse<Task>> {
        return this.http.post<GeneralResponse<Task>>(this.url + "AddTask", task);
    }

    updateTask(task: Task): Observable<GeneralResponse<Task>> {
        return this.http.put<GeneralResponse<Task>>(this.url + `UpdateTask/${task.id}`, task);
    }

    getTasks(): Observable<GeneralResponse<Task[]>> {
        return this.http.get<GeneralResponse<Task[]>>(this.url + "GetTasks").pipe(
            map((response: GeneralResponse<Task[]>) => ({
                ...response,
                data: response.data.map((task) => ({
                    ...task,
                    path: 'profile-15.jpeg', // Set path for all tasks
                }))
            }))
        );
    }

    setTaskStatus(taskId: number, status: string): Observable<GeneralResponse<Task>> {
        return this.http.put<GeneralResponse<Task>>(this.url + "SetTaskStatus", { taskId, status });
    }

    //gettaskstatistics
    getTaskStatistics(): Observable<GeneralResponse<any>> {
        return this.http.get<GeneralResponse<any>>(this.url + "GetTaskStatistics");
    }
}
