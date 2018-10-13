import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupLitThreadsSearchComponent } from './group-lit-threads-search.component';

describe('GroupLitThreadsSearchComponent', () => {
  let component: GroupLitThreadsSearchComponent;
  let fixture: ComponentFixture<GroupLitThreadsSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupLitThreadsSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupLitThreadsSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
