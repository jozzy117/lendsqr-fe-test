import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { LendsqrControl } from 'src/app/@core/enum/lendsqr-control-type';

@Component({
  selector: 'app-filter-form',
  templateUrl: './filter-form.component.html',
  styleUrls: ['./filter-form.component.scss']
})
export class FilterFormComponent {
  filterForm!: FormGroup;
  public LENDSQR_CONTROLS: typeof LendsqrControl = LendsqrControl;
  public organizations: string[] = ['Lendsqr', 'Lendstar'];
  public status: string[] = ['active', 'inactive', 'blacklisted', 'pending'];

  constructor(
    private dialogRef: MatDialogRef<FilterFormComponent>,
    private fb: FormBuilder
    ) {
    this.filterForm = this.fb.group({
      username: [''],
      email: [''],
      date: [''],
      phoneNumber: [''],
      status: [''],
      organization: ['']
    });
  }

  hasAnyValue(): boolean {
    return Object.keys(this.filterForm.controls).some(key => {
      const controlValue = this.filterForm.get(key)?.value;
      return controlValue !== null && controlValue !== undefined && controlValue !== '';
    });
  }

  onSubmit() {
    if (this.filterForm.valid) {
      this.dialogRef.close(this.filterForm.value);
    }
  }

  onReset() {
    this.filterForm.reset();
  }
}
