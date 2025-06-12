import { Component, Input } from '@angular/core';

interface Lecturer {
  name: string;
  email: string;
  officeHours: string;
  details: string; // Additional details about the lecturer
}

@Component({
  selector: 'app-lecturer-card',
  templateUrl: './lecturer-card.component.html',
  styleUrl: './lecturer-card.component.css'
})
export class LecturerCardComponent {
  @Input() lecturer!: Lecturer;

  viewDetails(lecturer: Lecturer) {
      // Logic to open a modal with detailed information about the lecturer
      console.log(`Viewing details for lecturer: ${lecturer.name}`);
  }

  scheduleMeeting(lecturer: Lecturer) {
      // Logic to schedule a meeting, e.g., open a modal or navigate to a scheduling page
      console.log(`Scheduling meeting with lecturer: ${lecturer.name}`);
  }
}
