import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { AlertService } from './alert.service';
import { Router } from '@angular/router';
import { IApiErrorResponse } from '../interfaces/api-response';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private alertService: AlertService, private router: Router) { }

  //Handles the error and returns a never to the error interceptor
  handleError(error?: ErrorEvent | HttpErrorResponse): Observable<never> {
    let errorMessage: string = '';
    if (!navigator.onLine) {
      errorMessage =
        'No Internet Connection. Please check your internet provider';
    } else if (error && error instanceof HttpErrorResponse) {
      errorMessage = this.processErrorMessage(error);
    } else if (error?.error instanceof ErrorEvent) {
      errorMessage = error?.error?.message
        ? error?.error?.message
        : error?.error?.toString() ?? 'An error occurred';
    }

    this.alertService.errorAlert('Error', errorMessage, 5000, true);
    return throwError(() => new Error(errorMessage));
  }

  //Returns a string of the error message from the api error response
  processErrorMessage(error: HttpErrorResponse): string {
    let message: string;

    const apiErrorResponse: IApiErrorResponse = error;
    switch (error.status) {
      case 400:
        if (Array.isArray(apiErrorResponse.error.errors)) {
          let messageArray: string[] = [];
          const error_body = apiErrorResponse.error?.errors;
          for (let key in error_body) {
            messageArray.push(error_body[key]);
          }
          message = messageArray.join('<br />');
        } else {
          message = apiErrorResponse.error?.message;
        }
        break;
      case 401:
        message = apiErrorResponse.error?.message ?? 'You are not logged in';
        this.router.navigate(['/auth/login']);
        break;
      case 403:
        message = apiErrorResponse.error?.message;
        break;
      case 404:
      case 409:
      case 500:
      case 502:
      case 503:
        message = apiErrorResponse?.error?.message;
        break;
      default:
        message =
          'An unknown error occurred and we are unable to handle your request. Please try again!';
        break;
    }
    return message;
  }
}
