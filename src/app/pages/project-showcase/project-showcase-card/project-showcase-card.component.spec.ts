import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectShowcaseCardComponent } from './project-showcase-card.component';

describe('ProjectShowcaseCardComponent', () => {
  let component: ProjectShowcaseCardComponent;
  let fixture: ComponentFixture<ProjectShowcaseCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectShowcaseCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectShowcaseCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
