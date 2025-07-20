import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupUpComponent } from './signup.component';

describe('SignupUpComponent', () => {
  let component: SignupUpComponent;
  let fixture: ComponentFixture<SignupUpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SignupUpComponent]
    });
    fixture = TestBed.createComponent(SignupUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
