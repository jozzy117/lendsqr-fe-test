import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPageRequest } from '../interfaces/table';
import { Endpoint } from '../endpoint';
import { IApiResponse } from '../interfaces/api-response';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private storageKey: string = 'userDetails';

  constructor(private http: HttpClient, private toastr: ToastrService) { }

  getUsers(
    params?: Partial<{
      page: number;
      size: number;
      search?: string;
    }>
  ) {
    return this.http.get<IApiResponse<any[]>>(
        `${Endpoint.USERS.users}`,
        { params: params }
    );
  }

  saveUserDetails(userDetails: IApiResponse<any[]>): void {
    localStorage.setItem(this.storageKey, JSON.stringify(userDetails));
  }

  getUserDetails(): IApiResponse<any[]> {
    const userDetails = localStorage.getItem(this.storageKey);
    return userDetails ? JSON.parse(userDetails) : null;
  }

  getUserById(userId: string): any {
    const userDetails = this.getUserDetails();
    if (userDetails) {
      return userDetails.items.find((user: any) => user._id === userId);
    }
    return null;
  }

  updateUser(userId: string, updatedUserData: any): void {
    const userDetails = this.getUserDetails();
    if (userDetails) {
      const userIndex = userDetails.items.findIndex((user: any) => user._id === userId);
      if (userIndex !== -1) {
        userDetails.items[userIndex] = { ...userDetails.items[userIndex], ...updatedUserData };
        this.saveUserDetails(userDetails);
      } else {
        this.toastr.error('User not found');
      }
    } else {
      this.toastr.error('No users found in local storage');
    }
  }

  searchUsers(criteria: any, pageSize: number): IApiResponse<any[]> {
    const usersResponse = this.getUserDetails();
    const filteredUsers = usersResponse.items.filter(user =>
      (!criteria.username || user.name.toLowerCase().includes(criteria.username.toLowerCase())) &&
      (!criteria.email || user.email.toLowerCase().includes(criteria.email.toLowerCase())) &&
      (!criteria.date || user.registered === criteria.date) &&
      (!criteria.phoneNumber || user.phone === criteria.phoneNumber) &&
      (!criteria.status || user.status.toLowerCase() === criteria.status.toLowerCase()) &&
      (!criteria.organization || user.company.toLowerCase() === criteria.organization.toLowerCase())
    );

    const totalCount = filteredUsers.length;
    const totalPages = Math.ceil(totalCount / pageSize);

    return {
      currentPage: usersResponse.currentPage,
      totalPages: totalPages,
      pageSize: pageSize,
      totalCount: totalCount,
      items: filteredUsers,
      hasPrevious: usersResponse.hasPrevious,
      hasNext: usersResponse.hasNext
    };
  }

  clearUserDetails(): void {
    localStorage.removeItem(this.storageKey);
  }
}
