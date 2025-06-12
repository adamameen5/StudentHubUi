import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

interface Lecturer {
  id: number;
  name: string;
  email: string;
  officeHours: string;
  details: string;
}

@Component({
  selector: 'app-lecturer-details',
  templateUrl: './lecturer-details.component.html',
  styleUrl: './lecturer-details.component.css'
})
export class LecturerDetailsComponent implements OnInit {
  lecturer!: Lecturer;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    const lecturerId = +this.route.snapshot.paramMap.get('id')!; // Get the lecturer ID from the route
    this.fetchLecturerDetails(lecturerId); // Fetch details based on ID
  }

  fetchLecturerDetails(id: number) {
    // Mock data, replace with actual data fetching logic
    const lecturers: Lecturer[] = [
      { id: 1, name: 'Dr. Alice Smith', email: 'alice.smith@example.com', officeHours: 'Mon 2-4 PM', details: 'Specializes in Algorithms.' },
      { id: 2, name: 'Prof. Bob Johnson', email: 'bob.johnson@example.com', officeHours: 'Tue 1-3 PM', details: 'Specializes in Data Structures.' },
      // Add more lecturers as needed
    ];
    this.lecturer = lecturers.find(lec => lec.id === id)!; // Find lecturer by ID
  }

  scheduleMeeting(lecturer: Lecturer) {
    // Logic for scheduling a meeting, e.g., open a modal or navigate to a meeting scheduler
    console.log(`Scheduling meeting with ${lecturer.name}`);
  }

  sendEmail(email: string) {
    // Logic to open the default email client or navigate to an email sending component
    window.open(`mailto:${email}`, '_blank'); // Opens the default email client
  }
}
