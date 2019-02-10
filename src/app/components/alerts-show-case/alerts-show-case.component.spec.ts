import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertsShowCaseComponent } from './alerts-show-case.component';

describe('AlertsShowCaseComponent', () => {
  let component: AlertsShowCaseComponent;
  let fixture: ComponentFixture<AlertsShowCaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertsShowCaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertsShowCaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
