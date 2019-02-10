import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateActivityModalComponent } from './create-activity-modal.component';

describe('CreateActivityModalComponent', () => {
  let component: CreateActivityModalComponent;
  let fixture: ComponentFixture<CreateActivityModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateActivityModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateActivityModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
