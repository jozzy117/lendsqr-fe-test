import { TestBed } from '@angular/core/testing';

import { UsersService } from './users.service';
import { HttpClientModule } from '@angular/common/http';
import { ActiveToast, IndividualConfig, ToastrService } from 'ngx-toastr';

class ToastrServiceStub {
  error(message?: string, title?: string, override?: Partial<IndividualConfig>): ActiveToast<any> {
    return {} as ActiveToast<any>;
  }
}

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        UsersService,
        { provide: ToastrService, useValue: ToastrServiceStub  },
      ],
    });
    service = TestBed.inject(UsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
