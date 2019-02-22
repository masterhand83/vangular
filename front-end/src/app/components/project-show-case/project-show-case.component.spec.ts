import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectShowCaseComponent } from './project-show-case.component';

describe('ProjectShowCaseComponent', () => {
  let component: ProjectShowCaseComponent;
  let fixture: ComponentFixture<ProjectShowCaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectShowCaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectShowCaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
