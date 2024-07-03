import { TestBed } from '@angular/core/testing';

import { AlertService } from './alert.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';

describe('AlertService', () => {
  let service: AlertService;
  let toastrServiceSpy: jasmine.SpyObj<ToastrService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('ToastrService', ['error']);

    TestBed.configureTestingModule({
      imports: [ToastrModule.forRoot()],
      providers: [
        AlertService,
        { provide: ToastrService, useValue: spy }
      ]
    });
    service = TestBed.inject(AlertService);
    toastrServiceSpy = TestBed.inject(ToastrService) as jasmine.SpyObj<ToastrService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call ToastrService.error with correct parameters', () => {
    const title = 'Error';
    const text = 'Internal Server Error';
    const timer = 5000;
    const enableHtml = true;

    service.errorAlert(title, text, timer, enableHtml);

    expect(toastrServiceSpy.error).toHaveBeenCalledWith(text, title, {
      timeOut: timer,
      enableHtml: enableHtml
    });
  });
});
