import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatTableModule} from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';

import { TableComponent } from './table/table.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardSummaryComponent } from './dashboard-summary/dashboard-summary.component';
import { ButtonComponent } from './button/button.component';
import { DateFormatPipe } from 'src/app/@core/pipes/date-format.pipe';
import { UserProfileSummaryComponent } from './user-profile-summary/user-profile-summary.component';
import { FilterFormComponent } from './filter-form/filter-form.component';
import { LendsqrControlsModule } from './lendsqr-controls/lendsqr-controls.module';
import { MobileTableComponent } from './mobile-table/mobile-table.component';

const MATMODULE = [
  MatTableModule,
  MatMenuModule,
  MatTooltipModule,
  MatDialogModule
]

@NgModule({
  declarations: [
    TableComponent,
    PaginatorComponent,
    DashboardSummaryComponent,
    ButtonComponent,
    DateFormatPipe,
    UserProfileSummaryComponent,
    FilterFormComponent,
    MobileTableComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LendsqrControlsModule,
    ...MATMODULE
  ],
  exports: [
    TableComponent,
    PaginatorComponent,
    DashboardSummaryComponent,
    ButtonComponent,
    UserProfileSummaryComponent,
    FilterFormComponent,
    MobileTableComponent,
    ...MATMODULE
  ]
})
export class SharedModule { }
