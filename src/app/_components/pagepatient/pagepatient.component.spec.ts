import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagepatientComponent } from './pagepatient.component';

describe('PagepatientComponent', () => {
  let component: PagepatientComponent;
  let fixture: ComponentFixture<PagepatientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagepatientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagepatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
