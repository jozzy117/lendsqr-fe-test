import { TableColumnType } from "../types/table.types";

export interface ITableColumn {
    name: string;
    key: string;
    type: TableColumnType;
}

export interface IPagination {
    hasNext: boolean;
    hasPrevious: boolean;
    currentPage: number;
    totalPages: number;
    pageSize: number;
    totalCount: number;
}

export interface IPageRequest {
    page: number;
    size: number;
    search: string;
}