import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  private _mbSidenavStateSubject = new BehaviorSubject<boolean>(false);
  sidenavState$ = this._mbSidenavStateSubject.asObservable();

  isDesktop$ = this.breakpointObserver.observe(`(min-width: 992px)`).pipe(
    map(state => state.matches)
  );
  isMobile$ = this.breakpointObserver.observe(`(max-width: 480px)`).pipe(
    map(state => state.matches)
  );
  // isTablet$ = this.breakpointObserver.observe(`(max-width: 1200px)`).pipe(
  //   map(state => state.matches)
  // );

  constructor(private breakpointObserver: BreakpointObserver) { }

  toggleMbSidenav() {
    const currentState = this._mbSidenavStateSubject.value;
    this._mbSidenavStateSubject.next(!currentState);
  }

  openMbSidenav() {
    this._mbSidenavStateSubject.next(true);
  }

  closeMbSidenav() {
    this._mbSidenavStateSubject.next(false);
  }
}
