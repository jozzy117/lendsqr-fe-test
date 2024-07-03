export type TableColumnType =
  | 'text'
  | 'email'
  | 'number'
  | 'date'
  | 'dateTime'
  | 'status'
  | 'action';

export type ButtonActionTypes =
  | 'view'
  | 'blacklist'
  | 'activate'
  | 'deactivate';

export type PageType = number | 'next' | 'previous' | '...';