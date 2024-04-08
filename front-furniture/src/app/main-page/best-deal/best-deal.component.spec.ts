import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BestDealComponent } from './best-deal.component';

describe('BestDealComponent', () => {
  let component: BestDealComponent;
  let fixture: ComponentFixture<BestDealComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BestDealComponent]
    });
    fixture = TestBed.createComponent(BestDealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
