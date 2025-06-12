import { Component, OnInit } from '@angular/core';

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
  selector: 'app-course-engagement',
  templateUrl: './course-engagement.component.html',
  styleUrl: './course-engagement.component.css'
})
export class CourseEngagementComponent implements OnInit {
  subjects: Subject[] = [
    {
      id : 1,
      name: 'Economics',
      code: 'CS101',
      credits: 3,
      lecturers: [
        { id: 1, name: 'Dr. Alice Smith', email: 'alice.smith@example.com', officeHours: 'Mon 2-4 PM', details: 'Specializes in Algorithms.' },
        { id: 2, name: 'Prof. Bob Johnson', email: 'bob.johnson@example.com', officeHours: 'Tue 1-3 PM', details: 'Specializes in Data Structures.' }
      ]
    },
    {
      id : 2,
      name: 'Mathematics for Computing',
      code: 'MATH101',
      credits: 4,
      lecturers: [
        { id: 3, name: 'Dr. Charlie Brown', email: 'charlie.brown@example.com', officeHours: 'Wed 3-5 PM', details: 'Expert in Mathematical Theory.' }
      ]
    },
    // Add more subjects here...
  ];

  ngOnInit(): void {
    // Initialize subject list if needed
  }
}
