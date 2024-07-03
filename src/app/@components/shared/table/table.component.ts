import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatTableDataSource } from '@angular/material/table';
import { UserStatus } from 'src/app/@core/enum/user-status';
import { IActionButton } from 'src/app/@core/interfaces/button';
import { IPagination, ITableColumn } from 'src/app/@core/interfaces/table';
import { ButtonActionTypes, PageType } from 'src/app/@core/types/table.types';
import { FilterFormComponent } from '../filter-form/filter-form.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnChanges {
  @ViewChild(MatMenuTrigger) menuTrigger!: MatMenuTrigger;
  
  @Input() columns!: ITableColumn[];
  @Input() actionButtons!: IActionButton[];
  @Input() pagination!: IPagination;
  @Input() showPagination: boolean = true;
  @Input() set data(payload: any) { this.dataSource = new MatTableDataSource(payload); }

  @Output() onactionTrigger: EventEmitter<{action: ButtonActionTypes; record: any;}> = new EventEmitter();
  @Output() rowClick: EventEmitter<any> = new EventEmitter();
  @Output() filterEmit: EventEmitter<any> = new EventEmitter();
  @Output() onPaginate: EventEmitter<PageType> = new EventEmitter();
  @Output() onPageSize: EventEmitter<number> = new EventEmitter();
  
  public dataSource!: MatTableDataSource<any>;
  public displayedColumns!: string[];
  public UserStatus = UserStatus;

  constructor(
    private dialog: MatDialog
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['columns'])
      this.displayedColumns = changes['columns'].currentValue.map(
        (col: any) => col.key
      );

    if (changes['pagination'])
      this.pagination = changes['pagination'].currentValue;
  }

  ngOnInit(): void {
    this.displayedColumns = this.columns.map((col) => col.key);
  }

  paginate(pageType: PageType) {
    this.onPaginate.emit(pageType);
  }

  pageSize(pageSize: number) {
    this.onPageSize.emit(pageSize);
  }

  triggerRowClick(record: any) {
    this.rowClick.emit(record);
  }

  initiateAction(action: ButtonActionTypes, record: any) {
    this.onactionTrigger.emit({ action, record });
  }

  triggerFilterMenu() {
    const filterModal = this.dialog.open(FilterFormComponent, {
      width: '27rem'
    });
    filterModal.afterClosed().subscribe((payload: any) => {
      if (payload) this.filterEmit.emit(payload);
    })
  }
}
