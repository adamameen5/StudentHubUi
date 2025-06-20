import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LecturerListComponent } from './lecturer-list.component';

describe('LecturerListComponent', () => {
  let component: LecturerListComponent;
  let fixture: ComponentFixture<LecturerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LecturerListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LecturerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
