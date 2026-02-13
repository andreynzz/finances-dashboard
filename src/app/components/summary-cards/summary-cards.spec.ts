import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryCardsComponent } from './summary-cards';

describe('SummaryCardsComponent', () => {
  let component: SummaryCardsComponent;
  let fixture: ComponentFixture<SummaryCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SummaryCardsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SummaryCardsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
