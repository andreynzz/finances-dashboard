import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTransactionModalComponent } from './new-transaction-modal';

describe('NewTransactionModalComponent', () => {
  let component: NewTransactionModalComponent;
  let fixture: ComponentFixture<NewTransactionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewTransactionModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewTransactionModalComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
