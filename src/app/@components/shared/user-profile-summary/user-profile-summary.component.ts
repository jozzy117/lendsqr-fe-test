import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-user-profile-summary',
  templateUrl: './user-profile-summary.component.html',
  styleUrls: ['./user-profile-summary.component.scss']
})
export class UserProfileSummaryComponent {
  @Input() user: any = {};
  @Output() tabChange = new EventEmitter

  activeId: number = 0;
  tabs: string[] = [
    'General Details',
    'Documents',
    'Bank Details',
    'Loans',
    'Savings',
    'App and System',
  ]

  tabClicked(i: number) {
    this.activeId = i;
    this.tabChange.emit(i)
  }
}
