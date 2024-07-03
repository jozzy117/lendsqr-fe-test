import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { distinctUntilChanged } from 'rxjs';
import { IPagination } from 'src/app/@core/interfaces/table';
import { PageType } from 'src/app/@core/types/table.types';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit, OnChanges {
  @Input() pagination!: IPagination;
  @Output() onPaginate: EventEmitter<PageType> = new EventEmitter()
  @Output() onPageSize: EventEmitter<number> = new EventEmitter()
  public pageSize: FormControl = new FormControl('20')

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pagination'])
      this.pagination = changes['pagination'].currentValue;
  }

  ngOnInit(): void {
    this.pageSizeListener()
  }

  paginate(pageType: any) {
    if (pageType === '...') return;
    this.onPaginate.emit(pageType)
  }

  pageSizeListener() {
    this.pageSize.valueChanges.pipe(
      distinctUntilChanged(),
    ).subscribe({
      next: (value) => this.onPageSize.emit(Number(value))
    })    
  }

  getPageNumbers() {
    const pageNumbers = [];
    if (this.pagination.totalPages <= 6) {
      for (let i = 1; i <= this.pagination.totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (this.pagination.currentPage <= 3) {
        // Show first three pages and the last two pages with ellipsis in between
        for (let i = 1; i <= 3; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(this.pagination.totalPages - 1);
        pageNumbers.push(this.pagination.totalPages);
      } else if (this.pagination.currentPage >= this.pagination.totalPages - 2) {
        // Show the first two pages and the last three pages with ellipsis in between
        pageNumbers.push(1);
        pageNumbers.push(2);
        pageNumbers.push('...');
        for (let i = this.pagination.totalPages - 2; i <= this.pagination.totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        // Show current page, one page number before and after, and first and last two pages
        pageNumbers.push(1);
        pageNumbers.push('...');
        pageNumbers.push(this.pagination.currentPage - 1);
        pageNumbers.push(this.pagination.currentPage);
        pageNumbers.push(this.pagination.currentPage + 1);
        pageNumbers.push('...');
        pageNumbers.push(this.pagination.totalPages - 1);
        pageNumbers.push(this.pagination.totalPages);
      }
    }
    return pageNumbers;
  }
}
