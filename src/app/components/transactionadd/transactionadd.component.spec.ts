import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionaddComponent } from './transactionadd.component';

describe('TransactionaddComponent', () => {
  let component: TransactionaddComponent;
  let fixture: ComponentFixture<TransactionaddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransactionaddComponent]
    });
    fixture = TestBed.createComponent(TransactionaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
