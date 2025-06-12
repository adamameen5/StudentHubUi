import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumniConnectComponent } from './alumni-connect.component';

describe('AlumniConnectComponent', () => {
  let component: AlumniConnectComponent;
  let fixture: ComponentFixture<AlumniConnectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlumniConnectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlumniConnectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
