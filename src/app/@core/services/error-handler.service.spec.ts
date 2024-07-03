import { TestBed } from '@angular/core/testing';

import { ErrorHandlerService } from './error-handler.service';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

describe('ErrorHandlerService', () => {
  let service: ErrorHandlerService;
  let toastrService: ToastrService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, ToastrModule.forRoot()],
      providers: [
        ErrorHandlerService,
        ToastrService,
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate')
          }
        },
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } }
      ]
    });
    service = TestBed.inject(ErrorHandlerService);
    toastrService = TestBed.inject(ToastrService);
    router = TestBed.inject(Router) as Router;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should handle a 401 error by navigating to login page', () => {
    const errorResponse = new HttpErrorResponse({
      error: { message: 'Unauthorized' },
      status: 401,
      statusText: 'Unauthorized'
    });

    spyOn(service, 'handleError').and.callThrough();

    service.handleError(errorResponse);

    expect(router.navigate).toHaveBeenCalledWith(['/auth/login']);
  });

  it('should handle a 500 error and display a generic error message', () => {
    const errorResponse = new HttpErrorResponse({
      error: { message: 'Internal Server Error' },
      status: 500,
      statusText: 'Internal Server Error'
    });

    spyOn(toastrService, 'error').and.stub();

    service.handleError(errorResponse);

    expect(toastrService.error).toHaveBeenCalledWith('Internal Server Error', 'Error', {
      timeOut: 5000, enableHtml: true 
    });
  });
});
