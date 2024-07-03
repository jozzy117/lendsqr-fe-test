import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { UserDetailsComponent } from './user-details.component';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { UsersService } from 'src/app/@core/services/users.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';

describe('UserDetailsComponent', () => {
  let component: UserDetailsComponent;
  let fixture: ComponentFixture<UserDetailsComponent>;
  let service: UsersService;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserDetailsComponent ],
      imports: [HttpClientTestingModule, ToastrModule.forRoot()],
      providers: [
        UsersService,
        ToastrService,
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: '66810f8634ef7216ec5fd826' }),
            snapshot: {
              paramMap: convertToParamMap({ id: '66810f8634ef7216ec5fd826' })
            }
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserDetailsComponent);
    component = fixture.componentInstance;

    service = TestBed.inject(UsersService);
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display user details when user found', () => {
    const mockUser = { id: 'testUserId', name: 'Test User', status: 'active' };

    spyOn(service, 'getUserById').and.returnValue(mockUser);

    component.ngOnInit();

    expect(component.user).toEqual(mockUser);
  });
});
