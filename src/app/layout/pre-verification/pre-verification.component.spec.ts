import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreVerificationComponent } from './pre-verification.component';

describe('PreVerificationComponent', () => {
  let component: PreVerificationComponent;
  let fixture: ComponentFixture<PreVerificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreVerificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
