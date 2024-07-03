import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { IApiResponse } from 'src/app/@core/interfaces/api-response';
import { IActionButton } from 'src/app/@core/interfaces/button';
import { IDashboardSummary } from 'src/app/@core/interfaces/dashboard-summary';
import { IPageRequest, IPagination, ITableColumn } from 'src/app/@core/interfaces/table';
import { UsersService } from 'src/app/@core/services/users.service';
import { ButtonActionTypes, PageType } from 'src/app/@core/types/table.types';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  public payload: any[] = [];
  public users: any[] = [];
  public pagination: IPagination = {
    hasNext: false,
    hasPrevious: false,
    currentPage: 0,
    pageSize: 0,
    totalPages: 0,
    totalCount: 0,
  };
  public pageRequest: IPageRequest = {
    page: 1,
    size: 20,
    search: ''
  };
  public dashboardSummaryData: IDashboardSummary[] = [
    {
      total: 2453,
      title: 'users',
      icon: 'assets/icons/users.svg'
    },
    {
      total: 2453,
      title: 'active users',
      icon: 'assets/icons/active-users.svg'
    },
    {
      total: 12453,
      title: 'users with loans',
      icon: 'assets/icons/users-with-loans.svg'
    },
    {
      total: 102453,
      title: 'users with savings',
      icon: 'assets/icons/users-with-savings.svg'
    }
  ]
  public columns: ITableColumn[] = [
    {
      name: 'Organization',
      type: 'text',
      key: 'company',
    },
    {
      name: 'Username',
      type: 'text',
      key: 'name',
    },
    {
      name: 'Email',
      type: 'email',
      key: 'email',
    },
    {
      name: 'Phone Number',
      type: 'text',
      key: 'phone',
    },
    {
      name: 'Date Joined',
      type: 'dateTime',
      key: 'registered',
    },
    {
      name: 'status',
      type: 'status',
      key: 'status',
    },
    {
      name: '',
      type: 'action',
      key: 'action',
    },
  ]
  public actionButtons: IActionButton[] = [
    {
      label: "View Details",
      action: "view",
      icon: "assets/icons/np_view.svg",
    },
    {
      label: "Blacklist User",
      action: "blacklist",
      icon: "assets/icons/np_delete-friend.svg",
    },
    {
      label: "Activate User",
      action: "activate",
      icon: "assets/icons/np_user_activate.svg",
    },
  ];

  constructor(
    private usersService: UsersService, 
    private spinner: NgxSpinnerService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.spinner.show();
    const localUsers = this.usersService.getUserDetails();
    if (localUsers) {
      this.processUsers(localUsers);
      this.spinner.hide();
    } else {
      this.usersService.getUsers(this.pageRequest).subscribe((res) => {
        if (res) {
          this.usersService.saveUserDetails(res);
          this.processUsers(res);
        }
        this.spinner.hide();
      });
    }
  }

  processUsers(res: IApiResponse<any[]>) {
    this.users = res.items;
    this.payload = this.paginatedUsers(this.users, this.pageRequest.size, this.pageRequest.page);
    this.dashboardSummaryData[0].total = this.users.length;
    this.dashboardSummaryData[1].total = this.users.filter((user: any) => user.status === 'active').length;
    this.dashboardSummaryData[2].total = this.users.filter((user: any) => parseFloat(user.loanRepayment.replace(/,/g, '')) > 0).length;
    this.dashboardSummaryData[3].total = this.users.filter((user: any) => user.isActive).length;
    this.setPaginations(res);
  }
  filterPageSize(pageSize: number) {
    this.pageRequest.page = 1;
    this.pageRequest.size = pageSize;
    this.getUsers();
  }

  paginatedUsers(users: any[], pageSize: number, pageNumber: number) {
    const startIndex = (pageNumber - 1) * pageSize;
    return users.slice(startIndex, startIndex + pageSize);
  }

  setPaginations(resp: any) {
    const paginationObject: IPagination = {
      hasNext: this.pageRequest.page < resp.totalPages ? true : false,
      hasPrevious: this.pageRequest.page > 1 ? true : false,
      currentPage: this.pageRequest.page,
      pageSize: resp.pageSize,
      totalPages: resp.totalPages,
      totalCount: resp.totalCount,
    }

    this.pagination = paginationObject;
  }

  paginate(pageType: any) {
    switch (pageType) {
      case 'next':
        this.pageRequest.page = this.pagination.currentPage + 1;
        break;
      case 'previous':
        this.pageRequest.page = this.pagination.currentPage - 1;
        break;
      default:
        this.pageRequest.page = pageType;
        break;
    }

    this.getUsers();
  }

  updateUserRecord(userId: string, updatedUserData: any): void {
    this.usersService.updateUser(userId, updatedUserData);
    this.toastr.success('User Status Updated Sucessfully')
  }

  filterData(searchCriteria: any) {
    const userResponse = this.usersService.searchUsers(searchCriteria, this.pageRequest.size);
    this.processUsers(userResponse);
  }

  performAction(ev: { action: ButtonActionTypes; record: any }) {
    const { action, record } = ev;

    switch (action) {
      case 'view':
        this.router.navigate([`/lendsqr/users`, record._id]);
        break;
      case 'blacklist':
        record.status = 'blacklisted';
        this.updateUserRecord(record._id, record);
        break;
      case 'activate':
        record.status = 'active'; 
        this.updateUserRecord(record._id, record);
        break;

    }
  }
}
