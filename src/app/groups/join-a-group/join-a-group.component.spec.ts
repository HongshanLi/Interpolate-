import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinAGroupComponent } from './join-a-group.component';

describe('JoinAGroupComponent', () => {
  let component: JoinAGroupComponent;
  let fixture: ComponentFixture<JoinAGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoinAGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinAGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
