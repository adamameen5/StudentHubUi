import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

interface Lecturer {
  id: number;
  name: string;
  email: string;
  officeHours: string;
  details: string;
}

@Component({
  selector: 'app-lecturer-list',
  templateUrl: './lecturer-list.component.html',
  styleUrl: './lecturer-list.component.css'
})
export class LecturerListComponent implements OnInit {
  subjectId!: number; // Get the subject ID from the parent component
  subjectName!: string; // Get the subject name from the parent component
  lecturers: Lecturer[] = []; // Array to hold lecturers

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.subjectId = +params['subjectId']; // Retrieve subject ID as a number
      this.subjectName = params['subjectName']; // Retrieve subject name
      this.fetchLecturers(); // Fetch lecturers for this subject
    });
  }

  fetchLecturers() {
    // Mock data, replace with actual data fetching logic (e.g., from a service)
    this.lecturers = [
      { id: 1, name: 'Dr. Alice Smith', email: 'alice.smith@example.com', officeHours: 'Mon 2-4 PM', details: 'Specializes in Algorithms.' },
      { id: 2, name: 'Prof. Bob Johnson', email: 'bob.johnson@example.com', officeHours: 'Tue 1-3 PM', details: 'Specializes in Data Structures.' },
      // Add more lecturers as needed
    ];
  }

  viewDetails(lecturer: Lecturer) {
    // Logic to navigate to the lecturer details page
    console.log(`Viewing details for lecturer: ${lecturer.name}`);
    // You can navigate to a details page if you have one set up
  }

  scheduleMeeting(lecturer: Lecturer) {
    // Logic to schedule a meeting, e.g., open a modal or navigate to a scheduling page
    console.log(`Scheduling meeting with lecturer: ${lecturer.name}`);
  }
}
