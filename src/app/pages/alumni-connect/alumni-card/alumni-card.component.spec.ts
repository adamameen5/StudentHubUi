import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumniCardComponent } from './alumni-card.component';

describe('AlumniCardComponent', () => {
  let component: AlumniCardComponent;
  let fixture: ComponentFixture<AlumniCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlumniCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlumniCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
