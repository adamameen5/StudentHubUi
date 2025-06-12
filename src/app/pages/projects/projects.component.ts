import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxCustomModalComponent } from 'ngx-custom-modal';
import { User } from 'src/app/models/user';
import { ProjectService } from 'src/app/service/project.service';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';
import { Project } from 'src/app/models/ObjectModels/project.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {
  @ViewChild('addProjectModal') addProjectModal!: NgxCustomModalComponent;

  projects: Project[] = [];
  projectForm!: FormGroup;
  usersInWorkspace: User[] = [];
  workspaceId: number = localStorage.getItem('workspaceId') ? parseInt(localStorage.getItem('workspaceId')!) : 0;
  loggedInUserId: number = localStorage.getItem('userId') ? parseInt(localStorage.getItem('userId')!) : 0;
  selectedProject: Project | null = null;
  imagePreview: string | null = null;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private userService: UserService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.initForm();
    this.loadWorkspaceUsers();
    this.loadProjects();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  initForm() {
    this.projectForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      id: [null]
    });
  }

  loadWorkspaceUsers(): void {
    this.userService.getUsersInWorkspace(this.workspaceId).subscribe((res) => {
      this.usersInWorkspace = res.data;
      this.usersInWorkspace = this.usersInWorkspace.filter(user => user.id !== this.loggedInUserId);
    });
  }

  openModal() {
    this.addProjectModal.open();
    this.projectForm.reset();
  }

  // Save or update project
  saveProject(): void {
    if (this.projectForm.valid) {
      const projectData = new FormData();
      projectData.append('id', this.projectForm.value.id || '');
      projectData.append('name', this.projectForm.value.name);
      projectData.append('description', this.projectForm.value.description);
      projectData.append('startDate', this.projectForm.value.startDate);
      projectData.append('endDate', this.projectForm.value.endDate);
      if (this.selectedFile) {
        projectData.append('image', this.selectedFile, this.selectedFile.name);
      }

      if (this.projectForm.value.id) {
        // Update project
        this.projectService.updateProject(projectData).subscribe({
          next: (response) => {
            if (response.isSuccess) {
              this.addProjectModal.close();
              this.projectForm.reset();
              this.imagePreview = null;
              this.selectedFile = null;
              const toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
              });
              toast.fire({
                icon: 'success',
                title: 'Project updated successfully',
                padding: '10px 20px',
              });
              this.loadProjects();
            }
          },
          error: (error) => {
            console.error('Error updating project:', error);
            alert('Failed to update project.');
          },
        });
      } else {
        // Create project
        this.projectService.createProject(projectData).subscribe({
          next: (response) => {
            if (response.isSuccess) {
              this.addProjectModal.close();
              this.projectForm.reset();
              this.imagePreview = null;
              this.selectedFile = null;
              const toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
              });
              toast.fire({
                icon: 'success',
                title: 'Project created successfully',
                padding: '10px 20px',
              });
              this.loadProjects();
            }
          },
          error: (error) => {
            console.error('Error creating project:', error);
            alert('Failed to create project.');
          },
        });
      }
    } else {
      alert('Please fill in all required fields.');
    }
  }

  // Close modal
  closeModal(): void {
    this.addProjectModal.close();
    this.projectForm.reset();
    this.imagePreview = null;
    this.selectedFile = null;
  }

  cancel() {
    this.projectForm.reset();
  }

  viewProject(project: any) {
    this.selectedProject = project;
    this.router.navigate(['/app/project/', project.id, project.name]);
  }

  closeProjectDetails() {
    this.selectedProject = null;
  }

  editProject(project: any) {
    const formatDateForInput = (isoDate: string) => {
      if (!isoDate) return '';
      const date = new Date(isoDate);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${year}-${month}-${day}`; // For the input type="date", we need yyyy-mm-dd
    };

    const formatDateForDisplay = (isoDate: string) => {
      if (!isoDate) return '';
      const date = new Date(isoDate);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`; // For display purposes, return dd/mm/yyyy
    };

    // Convert project dates
    const formattedProject = {
      ...project,
      startDate: formatDateForInput(project.startDate), // Format for input[type="date"]
      endDate: formatDateForInput(project.endDate), // Format for input[type="date"]
    };

    if (project.imageUrl) {
      this.imagePreview = project.imageUrl; // Use the existing ImageUrl for preview
    } else {
      this.imagePreview = null;
    }

    // Patch the form values
    this.projectForm.patchValue(formattedProject);

    // Open modal
    this.addProjectModal.open();
  }

  isBase64(url: string | null): boolean {
    return url ? url.startsWith('data:image/') : false;
  }

  loadProjects() {
    this.projectService.getProjects().subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.projects = response.data.map((project: Project) => ({
            id: project.id,
            name: project.name,
            description: project.description,
            status: project.status,
            role: project.role,  // Owner or Member
            imageUrl: project.imageUrl || '/assets/images/no-image-placeholder.png', // Default thumbnail
            teamMembers: 5, // Placeholder for now
            startDate: project.startDate,
            endDate: project.endDate,
          }));
        }
      },
      error: (error) => {
        console.error('Error loading projects:', error);
        alert('Failed to load projects.');
      },
    });
  }
}
