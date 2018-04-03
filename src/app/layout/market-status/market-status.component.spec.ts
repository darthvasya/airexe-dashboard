import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketStatusComponent } from './market-status.component';

describe('MarketStatusComponent', () => {
  let component: MarketStatusComponent;
  let fixture: ComponentFixture<MarketStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarketStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
