import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupLitSingleThreadComponent } from './group-lit-single-thread.component';

describe('GroupLitSingleThreadComponent', () => {
  let component: GroupLitSingleThreadComponent;
  let fixture: ComponentFixture<GroupLitSingleThreadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupLitSingleThreadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupLitSingleThreadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
