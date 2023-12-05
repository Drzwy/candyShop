import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandyCartComponent } from './candy-cart.component';

describe('CandyCartComponent', () => {
  let component: CandyCartComponent;
  let fixture: ComponentFixture<CandyCartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CandyCartComponent]
    });
    fixture = TestBed.createComponent(CandyCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
