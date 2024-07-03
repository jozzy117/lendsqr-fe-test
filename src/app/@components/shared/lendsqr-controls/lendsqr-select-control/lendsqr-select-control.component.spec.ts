import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LendsqrSelectControlComponent } from './lendsqr-select-control.component';

describe('LendsqrSelectControlComponent', () => {
  let component: LendsqrSelectControlComponent;
  let fixture: ComponentFixture<LendsqrSelectControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LendsqrSelectControlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LendsqrSelectControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
