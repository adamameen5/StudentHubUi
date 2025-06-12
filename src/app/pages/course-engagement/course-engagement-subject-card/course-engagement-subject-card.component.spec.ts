import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseEngagementSubjectCardComponent } from './course-engagement-subject-card.component';

describe('CourseEngagementSubjectCardComponent', () => {
  let component: CourseEngagementSubjectCardComponent;
  let fixture: ComponentFixture<CourseEngagementSubjectCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseEngagementSubjectCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseEngagementSubjectCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
