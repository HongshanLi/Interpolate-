import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocDisplayComponent } from './doc-display.component';

describe('DocDisplayComponent', () => {
  let component: DocDisplayComponent;
  let fixture: ComponentFixture<DocDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
