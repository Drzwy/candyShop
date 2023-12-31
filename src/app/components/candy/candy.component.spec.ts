/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CandyComponent } from './candy.component';

describe('CandyComponent', () => {
  let component: CandyComponent;
  let fixture: ComponentFixture<CandyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
