import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IddleUserComponent } from './iddle-user.component';

describe('IddleUserComponent', () => {
  let component: IddleUserComponent;
  let fixture: ComponentFixture<IddleUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IddleUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IddleUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
