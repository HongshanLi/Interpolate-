import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupLitThreadsMgmtComponent } from './group-lit-threads-mgmt.component';

describe('GroupLitThreadsMgmtComponent', () => {
  let component: GroupLitThreadsMgmtComponent;
  let fixture: ComponentFixture<GroupLitThreadsMgmtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupLitThreadsMgmtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupLitThreadsMgmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
