import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { FilterFormComponent } from './filter-form.component';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

class MatDialogRefMock {
  close(value?: any): void {}
}

describe('FilterFormComponent', () => {
  let component: FilterFormComponent;
  let fixture: ComponentFixture<FilterFormComponent>;
  let dialogRef: jasmine.SpyObj<MatDialogRef<FilterFormComponent>>;

  beforeEach(async () => {
    const matDialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      declarations: [ FilterFormComponent ],
      providers: [
        FormBuilder,
        { provide: MatDialogRef, useClass: MatDialogRefMock, useValue: matDialogRefSpy }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterFormComponent);
    component = fixture.componentInstance;
    dialogRef = TestBed.inject(MatDialogRef) as jasmine.SpyObj<MatDialogRef<FilterFormComponent>>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close dialog on form submission if form is valid', fakeAsync(() => {
    component.filterForm.patchValue({
      username: 'testuser',
      email: 'test@example.com',
      date: '2024-07-03',
      phoneNumber: '1234567890',
      status: 'active',
      organization: 'Lendsqr'
    });

    component.onSubmit();
    tick();

    expect(dialogRef.close).toHaveBeenCalledWith(component.filterForm.value);
  }));
});
