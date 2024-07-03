import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UtilsService } from 'src/app/@core/services/utils.service';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() label: string = '';
  @Input() bgColor: string = '';
  @Input() color: string = '--lendsqr-error';
  @Input() borderColor: string = '--lendsqr-error';
  @Input() width: string = '';
  @Input() type: string = 'button';
  @Input() borderWidth: string = '0.1rem';
  @Input() height: string = '4rem';
  @Input() fontSize: string = '--lendsqr-sm';
  @Input() fontWeight: string = '--lendsqr-semi-bold';
  @Input() borderRadius: string = '0.8rem';
  @Input() padding: string = '0.8rem 1.6rem';
  @Input() borderStyle: string = 'solid';
  @Input() disabled: boolean = false;

  @Output() buttonAction = new EventEmitter();

  constructor(public utils: UtilsService) { }
  submit() {
    this.buttonAction.emit();
  }
}
