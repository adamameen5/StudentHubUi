import { Component, Input } from '@angular/core';

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
  selector: 'app-alumni-card',
  templateUrl: './alumni-card.component.html',
  styleUrl: './alumni-card.component.css'
})
export class AlumniCardComponent {
  @Input() alumni!: Alumni; // Accept 'alumni' as input property
}
