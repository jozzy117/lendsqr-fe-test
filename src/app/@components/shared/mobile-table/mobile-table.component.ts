import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IActionButton } from 'src/app/@core/interfaces/button';
import { IPagination } from 'src/app/@core/interfaces/table';
import { ButtonActionTypes, PageType } from 'src/app/@core/types/table.types';

@Component({
  selector: 'app-mobile-table',
  templateUrl: './mobile-table.component.html',
  styleUrls: ['./mobile-table.component.scss']
})
export class MobileTableComponent {
  @Input() data: any;
  @Input() actionButtons!: IActionButton[];
  @Input() pagination!: IPagination;
  @Input() showPagination: boolean = true;
  @Output() onactionTrigger = new EventEmitter();
  @Output() onPaginate: EventEmitter<PageType> = new EventEmitter();
  @Output() onPageSize: EventEmitter<number> = new EventEmitter();

  initiateAction(action: ButtonActionTypes, record: any) {
    this.onactionTrigger.emit({ action, record });
  }

  paginate(pageType: PageType) {
    this.onPaginate.emit(pageType);
  }

  pageSize(pageSize: number) {
    this.onPageSize.emit(pageSize);
  }
}
