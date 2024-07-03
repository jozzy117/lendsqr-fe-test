import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard-summary',
  templateUrl: './dashboard-summary.component.html',
  styleUrls: ['./dashboard-summary.component.scss']
})
export class DashboardSummaryComponent {
  @Input() total: number = 0
  @Input() title: string = '';
  @Input() icon: string = 'assets/icons/users.svg'
}
