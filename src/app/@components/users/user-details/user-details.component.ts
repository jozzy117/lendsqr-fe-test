import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from 'src/app/@core/services/users.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  user: any = {};
  selectedUserId!: string;
  tabIndex: number = 0

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private usersService: UsersService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.selectedUserId = params['id'];
        this.getUserDetails();
      }
    })
  }

  getUserDetails() {
    const user = this.usersService.getUserById(this.selectedUserId);
    if (user) {
      this.user = user;
    } else {
      this.toastr.error('User not found');
    }
  }

  updateUserRecord(userId: string, updatedUserData: any): void {
    this.usersService.updateUser(userId, updatedUserData);
    this.toastr.success('User Status Updated Sucessfully')
  }

  changeUserStatus(status: 'active' | 'blacklisted') {
    this.user.status = status;
    this.updateUserRecord(this.selectedUserId, this.user);
  }

  tabChange(index: number) {
   this.tabIndex = index;
  }

  goBack() {
    this.router.navigate(['lendsqr/users'])
  }
}
