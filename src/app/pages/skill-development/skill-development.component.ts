import { Component, OnInit } from '@angular/core';

interface Course {
  title: string;
  provider: string;
  duration: string;
  description: string;
}

@Component({
  selector: 'app-skill-development',
  templateUrl: './skill-development.component.html',
  styleUrl: './skill-development.component.css'
})
export class SkillDevelopmentComponent implements OnInit {

  courses: Course[] = [
    {
      title: 'Introduction to Programming',
      provider: 'Skill Academy',
      duration: '4 weeks',
      description: 'Learn the basics of programming using Python.'
    },
    {
      title: 'Web Development Bootcamp',
      provider: 'Tech University',
      duration: '8 weeks',
      description: 'Become a full-stack web developer.'
    },
    {
      title: 'Data Science and Machine Learning',
      provider: 'Data Institute',
      duration: '6 weeks',
      description: 'Explore data analysis and machine learning techniques.'
    },
    // Add more courses here...
  ];
  filteredCourses: Course[] = [];
  searchQuery: string = '';

  ngOnInit(): void {
    this.filteredCourses = this.courses;
  }

  filterCourses() {
    this.filteredCourses = this.courses.filter(course =>
      course.title.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
}
