import { Component, Input, Output, EventEmitter, OnInit, ChangeDetectorRef } from '@angular/core';
import { NgClass } from '@angular/common';
import { Collaborator, Project } from 'src/app/models/ObjectModels/project.model';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from 'src/app/service/project.service';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/service/user.service';
import { co } from '@fullcalendar/core/internal-common';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.css'
})

export class ProjectDetailsComponent implements OnInit {
  projectd!: number; // Get the subject ID from the parent component
  projectName!: string; // Get the subject name from the parent component
  collaborators: Collaborator[] = []; // Array to hold lecturers
  projectDetails!: Project;
  selectedUserId: number | null = null;
  usersToAssign: User[] = [];
  loggedInUserId: number = localStorage.getItem('userId') ? parseInt(localStorage.getItem('userId')!) : 0;
  workspaceId: number = localStorage.getItem('workspaceId') ? parseInt(localStorage.getItem('workspaceId')!) : 0;
  @Output() close = new EventEmitter<void>();

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private userService: UserService,
    private cdr: ChangeDetectorRef
  ) { }

  closeDetails() {
    this.close.emit();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.projectd = +params['projectId'];
      this.projectName = params['projectName'];
    });

    this.projectService.getProjectDetails(this.projectd).subscribe((response: any) => {
      if (response.isSuccess) {
        this.projectDetails = response.data;
        this.projectDetails.description = response.data.description || "No description available";
        this.projectDetails.imageUrl = response.data.imageUrl || "./assets/images/no-image-placeholder.png";
        this.collaborators = response.data.collaborators;
        this.collaborators.forEach((collaborator: Collaborator) => {
          collaborator.imagePath = "./assets/images/profile-1.jpeg";
        });
        this.loadUsers();
      }
    });
  }

  loadUsers(): void {
    this.userService.getUsersInWorkspace(this.workspaceId).subscribe((res) => {
      this.usersToAssign = res.data;
      this.usersToAssign = this.usersToAssign
        .filter(user => user.id !== this.loggedInUserId)
        .filter(user => !this.collaborators.find(collaborator => collaborator.id === user.id));
    });
  }

  editProject() {
  }


  addCollaborator(): void {
    this.projectService.addProjectCollaborator({
      projectId: this.projectDetails.id,
      userId: this.selectedUserId
    }).subscribe((response: any) => {
      if (response.isSuccess) {
        this.collaborators = response.data.collaborators;
        this.cdr.detectChanges();
        this.loadUsers();        
      }
    });
  }
}
