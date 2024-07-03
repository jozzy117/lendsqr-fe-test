import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileSummaryComponent } from './user-profile-summary.component';

describe('UserProfileSummaryComponent', () => {
  let component: UserProfileSummaryComponent;
  let fixture: ComponentFixture<UserProfileSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserProfileSummaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserProfileSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
