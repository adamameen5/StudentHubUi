import { Component } from '@angular/core';

interface AIProject {
  title: string;
  author: string;
  description: string;
  technologies: string[];
  link: string; // Link to the project
}

@Component({
  selector: 'app-project-showcase',
  templateUrl: './project-showcase.component.html',
  styleUrl: './project-showcase.component.css'
})
export class ProjectShowcaseComponent {
  projects: AIProject[] = [
    {
      title: 'AI-Powered Chatbot',
      author: 'John Doe',
      description: 'A chatbot that uses NLP to assist users in finding information.',
      technologies: ['Python', 'TensorFlow', 'Flask'],
      link: 'https://example.com/chatbot'
    },
    {
      title: 'Image Recognition System',
      author: 'Jane Smith',
      description: 'An image recognition system that identifies objects in images.',
      technologies: ['Python', 'OpenCV', 'Keras'],
      link: 'https://example.com/image-recognition'
    },
    // Add more projects here...
  ];
  filteredProjects: AIProject[] = [];
  searchQuery: string = '';

  ngOnInit(): void {
    this.filteredProjects = this.projects;
  }

  filterProjects() {
    this.filteredProjects = this.projects.filter(project =>
      project.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
}
