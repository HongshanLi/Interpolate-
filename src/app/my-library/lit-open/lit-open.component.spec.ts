import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LitOpenComponent } from './lit-open.component';

describe('LitOpenComponent', () => {
  let component: LitOpenComponent;
  let fixture: ComponentFixture<LitOpenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LitOpenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LitOpenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
