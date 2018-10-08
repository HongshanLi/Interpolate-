import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupLitThreadUpdateComponent } from './group-lit-thread-update.component';

describe('GroupLitThreadUpdateComponent', () => {
  let component: GroupLitThreadUpdateComponent;
  let fixture: ComponentFixture<GroupLitThreadUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupLitThreadUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupLitThreadUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
