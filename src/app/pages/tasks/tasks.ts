import { Component, ViewChild } from '@angular/core';
import { toggleAnimation } from 'src/app/shared/animations';
import Swal from 'sweetalert2';
import { NgxCustomModalComponent } from 'ngx-custom-modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GeneralResponse } from 'src/app/models/generalResponse.model';
import { TaskService } from 'src/app/service/task.service';
import { Task } from 'src/app/models/ObjectModels/task.model';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/app/models/user';
import { Assignee } from 'src/app/models/ObjectModels/assignee.model';
@Component({
    templateUrl: './tasks.html',
    animations: [toggleAnimation],
    styleUrls: ['./tasks.css'],
})
export class TasksComponent {
    @ViewChild('addTaskModal') addTaskModal!: NgxCustomModalComponent;
    @ViewChild('viewTaskModal') viewTaskModal!: NgxCustomModalComponent;

    workspaceId: number = localStorage.getItem('workspaceId') ? parseInt(localStorage.getItem('workspaceId')!) : 0;
    usersToAssign: User[] = [];
    loggedInUserId: number = localStorage.getItem('userId') ? parseInt(localStorage.getItem('userId')!) : 0;
    loggedInUserName: string = localStorage.getItem('userName') || '';
    defaultParams = {
        id: null,
        title: '',
        description: '',
        descriptionText: '',
        assignee: '',
        path: '',
        tag: '',
        priority: 'low',
    };
    selectedTab = '';
    isShowTaskMenu = false;
    addTaskForm!: FormGroup;
    allTasks: Task[] = [];
    filteredTasks: any = [];
    pagedTasks: any = [];
    searchTask = '';
    selectedTask: any = this.defaultParams;
    isPriorityMenu: any = null;
    isTagMenu: any = null;

    pager = {
        currentPage: 1,
        totalPages: 0,
        pageSize: 10,
        startIndex: 0,
        endIndex: 0,
    };

    editorOptions = {
        toolbar: [[{ header: [1, 2, false] }], ['bold', 'italic', 'underline', 'link'], [{ list: 'ordered' }, { list: 'bullet' }], ['clean']],
    };
    dropdownPosition: 'down' | 'up' = 'down';

    constructor(
        public fb: FormBuilder,
        private taskService: TaskService,
        private userService: UserService
    ) { }

    ngOnInit() {
        this.loadTasks();
    }

    loadTasks() {
        this.taskService.getTasks().subscribe(
            (response) => {
                if (response.isSuccess) {
                    this.allTasks = response.data;
                    this.searchTasks();
                } else {
                    console.error('Error fetching tasks:', response.errorMessage);
                }
            }
        );
    }

    initForm() {
        this.addTaskForm = this.fb.group({
            id: [null],
            title: ['', Validators.required],
            description: ['', Validators.required],
            descriptionText: [''],
            assignee: [this.loggedInUserId, Validators.required],
            path: [''],
            tag: ['IndividualTask', Validators.required],
            priority: ['low', Validators.required],
        });
    }

    searchTasks(isResetPage = true) {
        if (isResetPage) {
            this.pager.currentPage = 1;
        }
        let res;
        if (this.selectedTab === 'Complete' || this.selectedTab === 'important' || this.selectedTab === 'trash') {
            res = this.allTasks.filter((d) => d.status === this.selectedTab);
        } else {
            res = this.allTasks.filter((d) => d.status != 'trash');
        }

        if (this.selectedTab === 'IndividualTask' || this.selectedTab === 'GroupTask') {
            res = res.filter((d) => d.tag === this.selectedTab);
        } else if (this.selectedTab === 'high' || this.selectedTab === 'medium' || this.selectedTab === 'low') {
            res = res.filter((d) => d.priority === this.selectedTab);
        }
        this.filteredTasks = res.filter((d) => d.title?.toLowerCase().includes(this.searchTask));
        this.getPager();
    }

    getPager() {
        setTimeout(() => {
            if (this.filteredTasks.length) {
                this.pager.totalPages = this.pager.pageSize < 1 ? 1 : Math.ceil(this.filteredTasks.length / this.pager.pageSize);
                if (this.pager.currentPage > this.pager.totalPages) {
                    this.pager.currentPage = 1;
                }
                this.pager.startIndex = (this.pager.currentPage - 1) * this.pager.pageSize;
                this.pager.endIndex = Math.min(this.pager.startIndex + this.pager.pageSize - 1, this.filteredTasks.length - 1);
                this.pagedTasks = this.filteredTasks.slice(this.pager.startIndex, this.pager.endIndex + 1);
            } else {
                this.pagedTasks = [];
                this.pager.startIndex = -1;
                this.pager.endIndex = -1;
            }
        });
    }

    setPriority(task: any, name: string = '') {
        let item = this.filteredTasks.find((d: { id: any }) => d.id === task.id);
        item.priority = name;
        this.searchTasks(false);
    }

    setTag(task: any, name: string = '') {
        let item = this.filteredTasks.find((d: { id: any }) => d.id === task.id);
        item.tag = name;
        this.searchTasks(false);
    }

    tabChanged(type: any = null) {
        this.selectedTab = type;
        this.searchTasks();
        this.isShowTaskMenu = false;
    }

    taskComplete(task: any = null) {
        let item = this.filteredTasks.find((d: { id: any }) => d.id === task.id);
        item.status = item.status === 'Complete' ? 'InProgress' : 'Complete';
        this.taskService.setTaskStatus(task.id, item.status).subscribe((response) => {
            if (!response.isSuccess) {
                this.showMessage(response.errorMessage || 'An error occurred while updating the task status.', 'error');
            }
        });
        this.searchTasks(false);
    }

    setImportant(task: any = null) {
        let item = this.filteredTasks.find((d: { id: any }) => d.id === task.id);
        item.status = item.status === 'important' ? '' : 'important';
        this.searchTasks(false);
    }

    viewTask(item: any = null) {
        this.selectedTask = item;
        setTimeout(() => {
            this.viewTaskModal.open();
        });
    }

    addEditTask(task: any = null) {
        this.isShowTaskMenu = false;

        this.addTaskModal.open();
        this.initForm();
        if(task && task.role === 'Owner') {
            this.loadUsersInWorkspace();
        } else{
            this.loadUsersInWorkspaceByTask(task.id);
        }

        if (task) {
            this.addTaskForm.setValue({
                id: task.id,
                title: task.title,
                description: task.description,
                descriptionText: task.description,
                assignee: task.assignee.userId,
                path: task.path,
                tag: task.tag,
                priority: task.priority,
            });
        }
    }

    loadUsersInWorkspaceByTask(taskId: number): void {
        this.userService.getUsersInWorkspaceByTask(taskId, this.loggedInUserId).subscribe((res) => {
            this.usersToAssign = res.data;
            this.usersToAssign = this.usersToAssign.filter(user => user.id !== this.loggedInUserId);
        });
    }

    loadUsersInWorkspace(): void {
        this.userService.getUsersInWorkspace(this.workspaceId).subscribe((res) => {
            this.usersToAssign = res.data;
            this.usersToAssign = this.usersToAssign.filter(user => user.id !== this.loggedInUserId);
        });
    }

    deleteTask(task: any, type: string = '') {
        if (type === 'delete') {
            let currtask = this.allTasks.find((d: any) => d.id === task.id);
            currtask!.status = 'trash';
        }
        if (type === 'deletePermanent') {
            this.allTasks = this.allTasks.filter((d: any) => d.id != task.id);
        } else if (type === 'restore') {
            let currtask = this.allTasks.find((d: any) => d.id === task.id);
            currtask!.status = '';
        }
        this.searchTasks(false);
    }

    saveTask() {
        if (!this.addTaskForm.value.title) {
            this.showMessage('Title is required.', 'error');
            return;
        }

        if (!this.addTaskForm.value.description) {
            this.showMessage('Description is required.', 'error');
            return;
        }

        let requestData: Task = {
            title: this.addTaskForm.value.title,
            assignee: {
                UserId: this.addTaskForm.value.assignee,
                username: ''
            } as Assignee,
            tag: this.addTaskForm.value.tag,
            priority: this.addTaskForm.value.priority,
            description: this.addTaskForm.value.descriptionText,
            workspaceId: Number(localStorage.getItem('workspaceId')),
            id: this.addTaskForm.value.id
        };

        let apiCall = this.addTaskForm.value.id
            ? this.taskService.updateTask(requestData)
            : this.taskService.createTask(requestData);

        apiCall.subscribe((response: GeneralResponse<Task>) => {
            if (response.isSuccess) {
                this.loadTasks();
                this.showMessage('Task has been saved successfully.');
                this.addTaskModal.close();
            } else {
                this.showMessage(response.errorMessage || 'An error occurred while saving the task.', 'error');
            }
        });
    }

    showMessage(msg = '', type = 'success') {
        const toast: any = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 3000,
            customClass: { container: 'toast' },
        });
        toast.fire({
            icon: type,
            title: msg,
            padding: '10px 20px',
        });
    }

    setDiscriptionText(event: any) {
        this.addTaskForm.patchValue({ descriptionText: event.text });
    }

    getTasksLength(type: string) {
        return this.allTasks.filter((task) => task.status == type).length;
    }
}
