import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskcomplianceComponent } from './riskcompliance.component';

describe('RiskcomplianceComponent', () => {
  let component: RiskcomplianceComponent;
  let fixture: ComponentFixture<RiskcomplianceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RiskcomplianceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RiskcomplianceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
