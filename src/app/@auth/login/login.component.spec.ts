import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { AuthService } from '../services/auth.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy = { navigate: jasmine.createSpy('navigate') };

  beforeEach(async () => {
    const authSpy = jasmine.createSpyObj('AuthService', ['login']);
    const routerSpyObj = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      providers: [
        { provide: AuthService, useValue: authSpy },
        { provide: Router, useValue: routerSpyObj },
      ],
      imports: [ FormsModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    authServiceSpy.login.and.returnValue(true);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not navigate to users if email or password is empty', () => {
    component.login();

    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });

  it('should not navigate to users if email format is invalid', () => {
    component.email = 'invalid-email';
    component.password = 'password';
    component.login();

    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });

  it('should navigate to users if email and password are valid', () => {
    component.email = 'valid@example.com';
    component.password = 'validPassword';
    component.login();

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/lendsqr/users']);
  });
});
