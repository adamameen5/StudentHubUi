import { Component, OnInit } from '@angular/core';

interface Alumni {
  name: string;
  company: string;
  position: string;
  location: string;
  industry: string;
  graduationYear: number;
  bio: string;
  photoUrl: string;
}

@Component({
  selector: 'app-alumni-connect',
  templateUrl: './alumni-connect.component.html',
  styleUrl: './alumni-connect.component.css'
})
export class AlumniConnectComponent implements OnInit {
  alumniList: Alumni[] = [
    { name: 'John Doe', company: 'Tech Corp', position: 'Software Engineer', location: 'San Francisco', industry: 'Software', graduationYear: 2015, bio: 'Passionate about coding and helping students transition into the workforce.', photoUrl: './assets/images/profile-4.jpeg' },
    { name: 'Jane Smith', company: 'Marketing Inc', position: 'Marketing Manager', location: 'New York', industry: 'Marketing', graduationYear: 2018, bio: 'Experienced in digital marketing and brand strategy.', photoUrl: './assets/images/profile-8.jpeg' },
    { name: 'Mike Johnson', company: 'Finance Co', position: 'Financial Analyst', location: 'Remote', industry: 'Finance', graduationYear: 2012, bio: 'Helping young professionals understand finance and investments.', photoUrl: './assets/images/profile-1.jpeg' }
  ];
  filteredAlumni: Alumni[] = [];
  graduationYears: number[] = [];
  
  searchQuery: string = '';
  location: string = '';
  industry: string = '';
  graduationYear: number | '' = '';

  ngOnInit(): void {
    this.filteredAlumni = this.alumniList;
    this.generateGraduationYears();
  }

  filterAlumni() {
    this.filteredAlumni = this.alumniList.filter(alumni =>
      alumni.name.toLowerCase().includes(this.searchQuery.toLowerCase()) &&
      (this.location ? alumni.location.toLowerCase().includes(this.location.toLowerCase()) : true) &&
      (this.industry ? alumni.industry === this.industry : true) &&
      (this.graduationYear ? alumni.graduationYear === this.graduationYear : true)
    );
  }

  generateGraduationYears() {
    const currentYear = new Date().getFullYear();
    for (let year = currentYear; year >= 2000; year--) {
      this.graduationYears.push(year);
    }
  }
}
