import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskassessmenthomeComponent } from './riskassessmenthome.component';

describe('RiskassessmenthomeComponent', () => {
  let component: RiskassessmenthomeComponent;
  let fixture: ComponentFixture<RiskassessmenthomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RiskassessmenthomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RiskassessmenthomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
