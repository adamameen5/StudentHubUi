import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

interface Subject {
  id: number; // Unique ID for each
  name: string;
  code: string;
  credits: number;
  lecturers: Lecturer[];
}

interface Lecturer {
  id: number; // Unique ID for each lecturer
  name: string;
  email: string;
  officeHours: string;
  details: string;
}

@Component({
  selector: 'app-course-engagement-subject-card',
  templateUrl: './course-engagement-subject-card.component.html',
  styleUrl: './course-engagement-subject-card.component.css'
})
export class CourseEngagementSubjectCardComponent {
  @Input() subject!: Subject;

  constructor(private router: Router) {}

  viewLecturers(subject: Subject) {
      // Logic to open a modal or navigate to a new page displaying lecturers
      console.log(`Viewing lecturers for subject: ${subject.name}`);
      this.router.navigate(['/app/lecturer/',  subject.id, subject.name]);
      // Navigate to the lecturer list or display in a modal
  }
}
