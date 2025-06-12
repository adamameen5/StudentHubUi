import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillDevelopmentCardComponent } from './skill-development-card.component';

describe('SkillDevelopmentCardComponent', () => {
  let component: SkillDevelopmentCardComponent;
  let fixture: ComponentFixture<SkillDevelopmentCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkillDevelopmentCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkillDevelopmentCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
