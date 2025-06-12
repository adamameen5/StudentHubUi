import { Component, OnInit } from '@angular/core';

interface Job {
  title: string;
  company: string;
  location: string;
  jobType: string;
  experienceLevel: string;
  description: string;
}

@Component({
  selector: 'app-job-board',
  templateUrl: './job-board.component.html',
  styleUrl: './job-board.component.css'
})

export class JobBoardComponent implements OnInit {
  jobs: Job[] = [
    { title: 'Software Engineer', company: 'Tech Corp', location: 'San Francisco', jobType: 'Full-Time', experienceLevel: 'Mid-Level', description: 'Develop and maintain web applications.' },
    { title: 'Marketing Intern', company: 'Marketing Inc', location: 'Remote', jobType: 'Internship', experienceLevel: 'Entry-Level', description: 'Assist with marketing campaigns and social media management.' },
    { title: 'Project Manager', company: 'Project Co', location: 'New York', jobType: 'Full-Time', experienceLevel: 'Senior-Level', description: 'Oversee project timelines and deliverables.' }
  ];
  filteredJobs: Job[] = [];

  searchQuery: string = '';
  selectedJobType: string = '';
  location: string = '';
  experienceLevel: string = '';

  ngOnInit(): void {
    this.filteredJobs = this.jobs;
  }

  filterJobs() {
    this.filteredJobs = this.jobs.filter(job =>
      job.title.toLowerCase().includes(this.searchQuery.toLowerCase()) &&
      (this.selectedJobType ? job.jobType === this.selectedJobType : true) &&
      (this.location ? job.location.toLowerCase().includes(this.location.toLowerCase()) : true) &&
      (this.experienceLevel ? job.experienceLevel === this.experienceLevel : true)
    );
  }
}
