import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupLitThreadCreateComponent } from './group-lit-thread-create.component';

describe('GroupLitThreadCreateComponent', () => {
  let component: GroupLitThreadCreateComponent;
  let fixture: ComponentFixture<GroupLitThreadCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupLitThreadCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupLitThreadCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
