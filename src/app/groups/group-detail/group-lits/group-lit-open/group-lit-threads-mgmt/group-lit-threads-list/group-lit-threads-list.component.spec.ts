import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupLitThreadsListComponent } from './group-lit-threads-list.component';

describe('GroupLitThreadsListComponent', () => {
  let component: GroupLitThreadsListComponent;
  let fixture: ComponentFixture<GroupLitThreadsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupLitThreadsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupLitThreadsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
