import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupLitsComponent } from './group-lits.component';

describe('GroupLitsComponent', () => {
  let component: GroupLitsComponent;
  let fixture: ComponentFixture<GroupLitsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupLitsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupLitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
