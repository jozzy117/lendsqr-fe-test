import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LendsqrInputControlComponent } from './lendsqr-input-control.component';

describe('LendsqrInputControlComponent', () => {
  let component: LendsqrInputControlComponent;
  let fixture: ComponentFixture<LendsqrInputControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LendsqrInputControlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LendsqrInputControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
