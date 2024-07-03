import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { LendsqrControl } from 'src/app/@core/enum/lendsqr-control-type';
import { LendsqrControlType } from 'src/app/@core/types/lendsqr-controls.types';

@Component({
  selector: 'app-lendsqr-select-control',
  templateUrl: './lendsqr-select-control.component.html',
  styleUrls: ['./lendsqr-select-control.component.scss']
})
export class LendsqrSelectControlComponent {

  @Input() type: LendsqrControlType = LendsqrControl.SELECT;
  @Input() label: string = 'Username';
  @Input() placeholder: string = 'User';
  @Input() control!: AbstractControl<any> | null;
  @Input() options: string[] = [];
  public LENDSQR_CONTROLS: typeof LendsqrControl = LendsqrControl;

  isFormControl(control: AbstractControl | null): control is FormControl {
    return control instanceof FormControl;
  }

}
