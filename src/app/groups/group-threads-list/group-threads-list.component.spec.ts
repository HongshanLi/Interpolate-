import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupThreadsListComponent } from './group-threads-list.component';

describe('GroupThreadsListComponent', () => {
  let component: GroupThreadsListComponent;
  let fixture: ComponentFixture<GroupThreadsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupThreadsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupThreadsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
