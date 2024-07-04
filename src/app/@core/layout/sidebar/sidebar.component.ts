import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LayoutService } from '../../services/layout.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();
  @Input() mobile: boolean | null = false;
  sidenavOpen: boolean = false;
  activeId: string = 'customers0';

  linksObj: { [key: string]: { [key: string]: string }[] } = {
    customers: [
      {
        link: 'Users',
        img: 'assets/images/customers/users.svg'
      },
      {
        link: 'Guarantors',
        img: 'assets/images/customers/guarantors.svg'
      },
      {
        link: 'Loans',
        img: 'assets/images/customers/loans.svg'
      },
      {
        link: 'Decision Models',
        img: 'assets/images/customers/decision-models.svg'
      },
      {
        link: 'Savings',
        img: 'assets/images/customers/savings.svg'
      },
      {
        link: 'Loan Requests',
        img: 'assets/images/customers/loan-request.svg'
      },
      {
        link: 'Whitelist',
        img: 'assets/images/customers/whitelist.svg'
      },
      {
        link: 'Karma',
        img: 'assets/images/customers/karma.svg'
      },

    ],
    businesses: [
      {
        link: 'Organization',
        img: 'assets/images/businesses/organization.svg'
      },
      {
        link: 'Loan Products',
        img: 'assets/images/businesses/loan-products.svg'
      },
      {
        link: 'Savings Products',
        img: 'assets/images/businesses/savings-products.svg'
      },
      {
        link: 'Fees and Charges',
        img: 'assets/images/businesses/fees-and-charges.svg'
      },
      {
        link: 'Transactions',
        img: 'assets/images/businesses/transactions.svg'
      },
      {
        link: 'Services',
        img: 'assets/images/businesses/services.svg'
      },
      {
        link: 'Service Account',
        img: 'assets/images/businesses/service-account.svg'
      },
      {
        link: 'Settlements',
        img: 'assets/images/businesses/settlements.svg'
      },
      {
        link: 'Reports',
        img: 'assets/images/businesses/reports.svg'
      },

    ],
    settings: [
      {
        link: 'Preferences',
        img: 'assets/images/settings/preferences.svg'
      },
      {
        link: 'Fees and Pricing',
        img: 'assets/images/settings/fees-and-pricing.svg'
      },
      {
        link: 'Audit Logs',
        img: 'assets/images/settings/audit-logs.svg'
      },
    ],
  }

  constructor(private layoutService: LayoutService) { }

  ngOnInit() {
    this.subscriptions.add(
      this.layoutService.sidenavState$.subscribe(state => {
        this.sidenavOpen = state;
      })
    );
  }

  linkClicked(i: number, section: string) {
    this.activeId = section + i;
  }

  toggleSidenav() {
    this.layoutService.toggleMbSidenav();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
