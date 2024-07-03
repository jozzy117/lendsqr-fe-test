import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let routerSpy = { navigate: jasmine.createSpy('navigate') };

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      providers: [{ provide: Router, useValue: routerSpy }],
      imports: [ FormsModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not navigate to dashboard if email or password is empty', () => {
    component.login();

    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });

  it('should not navigate to dashboard if email format is invalid', () => {
    component.email = 'invalid-email';
    component.password = 'password';
    component.login();

    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });

  it('should navigate to dashboard if email and password are valid', () => {
    component.email = 'valid@example.com';
    component.password = 'validPassword';
    component.login();

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/lendsqr/dashboard']);
  });
});
