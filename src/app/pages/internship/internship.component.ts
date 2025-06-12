import { Component, OnInit } from '@angular/core';

interface Internship {
  title: string;
  company: string;
  location: string;
  duration: string;
  description: string;
  department?: string;
}

@Component({
  selector: 'app-internship',
  templateUrl: './internship.component.html',
  styleUrl: './internship.component.css'
})
export class InternshipComponent implements OnInit {

  internships: Internship[] = [
    {
      title: 'Software Engineering Intern',
      company: 'Tech Corp',
      location: 'Remote',
      duration: '3 months',
      description: 'Work on real projects and gain hands-on experience in software development.',
      department: 'Engineering'
    },
    {
      title: 'Multimedia Engineering Intern',
      company: 'Tech Corp',
      location: 'Remote',
      duration: '3 months',
      description: 'Work on real projects and gain hands-on experience in software development.',
      department: 'Engineering'
    },
    {
      title: 'Junior Graphics Designer Intern',
      company: 'Tech Corp',
      location: 'Remote',
      duration: '6 months',
      description: 'Work on real projects and gain hands-on experience in software development.',
      department: 'Engineering'
    },
    {
      title: 'Business Analyst Intern',
      company: 'Tech Corp',
      location: 'Remote',
      duration: '8 months',
      description: 'Work on real projects and gain hands-on experience in software development.',
      department: 'Engineering'
    },
    {
      title: 'Multimedia Engineering Intern',
      company: 'Tech Corp',
      location: 'Remote',
      duration: '3 months',
      description: 'Work on real projects and gain hands-on experience in software development.',
      department: 'Engineering'
    },
    {
      title: 'UI Developer Intern',
      company: 'Tech Corp',
      location: 'Remote',
      duration: '3 months',
      description: 'Work on real projects and gain hands-on experience in software development.',
      department: 'Engineering'
    }
    // Add more internships here...
  ];
  filteredInternships: Internship[] = [];

  searchQuery: string = '';
  selectedDepartment: string = '';
  selectedLocation: string = '';
  selectedDuration: string = '';

  ngOnInit(): void {
    this.filteredInternships = this.internships;
  }

  filterInternships() {
    this.filteredInternships = this.internships.filter(internship =>
      internship.title.toLowerCase().includes(this.searchQuery.toLowerCase()) &&
      (this.selectedDepartment ? internship.department === this.selectedDepartment : true) &&
      (this.selectedLocation ? internship.location === this.selectedLocation : true) &&
      (this.selectedDuration ? internship.duration === this.selectedDuration : true)
    );
  }

}
