import { Component, Input } from '@angular/core';

interface Job {
  title: string;
  company: string;
  location: string;
  jobType: string;
  experienceLevel: string;
  description: string;
}

@Component({
  selector: 'app-job-card',
  templateUrl: './job-card.component.html',
  styleUrl: './job-card.component.css',

})
export class JobCardComponent {
  @Input() job!: Job;
}
