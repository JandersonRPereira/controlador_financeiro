import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactioneditComponent } from './transactionedit.component';

describe('TransactioneditComponent', () => {
  let component: TransactioneditComponent;
  let fixture: ComponentFixture<TransactioneditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransactioneditComponent]
    });
    fixture = TestBed.createComponent(TransactioneditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
