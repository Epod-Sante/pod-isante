import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RapportVisuelComponent } from './rapport-visuel.component';

describe('RapportVisuelComponent', () => {
  let component: RapportVisuelComponent;
  let fixture: ComponentFixture<RapportVisuelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RapportVisuelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RapportVisuelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
