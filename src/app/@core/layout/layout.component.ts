import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { LayoutService } from '../services/layout.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  isDesktop$: Observable<boolean> = this.layoutService.isDesktop$;

  constructor(private layoutService: LayoutService) { }
}
