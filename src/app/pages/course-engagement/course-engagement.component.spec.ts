import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseEngagementComponent } from './course-engagement.component';

describe('CourseEngagementComponent', () => {
  let component: CourseEngagementComponent;
  let fixture: ComponentFixture<CourseEngagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseEngagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseEngagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
