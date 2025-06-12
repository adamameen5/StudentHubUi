import { Component, Input } from '@angular/core';

interface Internship {
  title: string;
  company: string;
  location: string;
  duration: string;
  description: string;
  department?: string;
}

@Component({
  selector: 'app-internship-card',
  templateUrl: './internship-card.component.html',
  styleUrl: './internship-card.component.css'
})
export class InternshipCardComponent {
  @Input() internship!: Internship;
}
