import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeseaComponent } from './homesea.component';

describe('HomeseaComponent', () => {
  let component: HomeseaComponent;
  let fixture: ComponentFixture<HomeseaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeseaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeseaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
