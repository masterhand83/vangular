import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInformationModalComponent } from './edit-information-modal.component';

describe('EditInformationModalComponent', () => {
  let component: EditInformationModalComponent;
  let fixture: ComponentFixture<EditInformationModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditInformationModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditInformationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
