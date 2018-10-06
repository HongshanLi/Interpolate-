import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupThreadsMgtComponent } from './group-threads-mgt.component';

describe('GroupThreadsMgtComponent', () => {
  let component: GroupThreadsMgtComponent;
  let fixture: ComponentFixture<GroupThreadsMgtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupThreadsMgtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupThreadsMgtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
