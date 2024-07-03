import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LayoutComponent } from './layout.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    NavbarComponent,
    SidebarComponent,
    LayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [LayoutComponent]
})
export class LayoutModule { }
