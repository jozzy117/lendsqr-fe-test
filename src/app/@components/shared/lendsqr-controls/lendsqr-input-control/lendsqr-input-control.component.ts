import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { LendsqrControl } from 'src/app/@core/enum/lendsqr-control-type';
import { LendsqrControlType } from 'src/app/@core/types/lendsqr-controls.types';

@Component({
  selector: 'app-lendsqr-input-control',
  templateUrl: './lendsqr-input-control.component.html',
  styleUrls: ['./lendsqr-input-control.component.scss']
})
export class LendsqrInputControlComponent {
  @Input() type: LendsqrControlType = LendsqrControl.TEXT;
  @Input() label: string = 'Username';
  @Input() placeholder: string = 'User';
  @Input() control!: AbstractControl<any> | null;
  public LENDSQR_CONTROLS: typeof LendsqrControl = LendsqrControl;

  isFormControl(control: AbstractControl | null): control is FormControl {
    return control instanceof FormControl;
  }

}
