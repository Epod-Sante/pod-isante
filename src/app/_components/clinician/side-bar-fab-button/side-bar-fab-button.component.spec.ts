import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideBarFabButtonComponent } from './side-bar-fab-button.component';

describe('SideBarFabButtonComponent', () => {
  let component: SideBarFabButtonComponent;
  let fixture: ComponentFixture<SideBarFabButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SideBarFabButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SideBarFabButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
