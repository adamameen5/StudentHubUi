import { Component, Input } from '@angular/core';

interface AIProject {
  title: string;
  author: string;
  description: string;
  technologies: string[];
  link: string; // Link to the project
}

@Component({
  selector: 'app-project-showcase-card',
  templateUrl: './project-showcase-card.component.html',
  styleUrl: './project-showcase-card.component.css'
})
export class ProjectShowcaseCardComponent {
  @Input() project!: AIProject;

  viewProject(project: AIProject) {
      // Logic to navigate to the project detail page or open a modal
      console.log(`Viewing project: ${project.title}`);
      // For example, navigate to the project detail route
  }
}
