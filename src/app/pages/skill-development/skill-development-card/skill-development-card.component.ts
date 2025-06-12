import { Component, Input } from '@angular/core';

interface Course {
  title: string;
  provider: string;
  duration: string;
  description: string;
}

@Component({
  selector: 'app-skill-development-card',
  templateUrl: './skill-development-card.component.html',
  styleUrl: './skill-development-card.component.css'
})
export class SkillDevelopmentCardComponent {
  @Input() course!: Course;

  enroll(course: Course) {
      // Handle enrollment logic
      console.log(`Enrolled in: ${course.title}`);
  }
}
