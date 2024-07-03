import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LendsqrInputControlComponent } from './lendsqr-input-control/lendsqr-input-control.component';
import { LendsqrSelectControlComponent } from './lendsqr-select-control/lendsqr-select-control.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    LendsqrInputControlComponent,
    LendsqrSelectControlComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    LendsqrInputControlComponent,
    LendsqrSelectControlComponent
  ]
})
export class LendsqrControlsModule { }
