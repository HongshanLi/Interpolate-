import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupLitOpenComponent } from './group-lit-open.component';

describe('GroupLitOpenComponent', () => {
  let component: GroupLitOpenComponent;
  let fixture: ComponentFixture<GroupLitOpenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupLitOpenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupLitOpenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
