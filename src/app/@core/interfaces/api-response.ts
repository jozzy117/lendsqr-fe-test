export interface IApiErrorResponse {
    error: {
      message: string;
      errors: string[]
    }
}

export interface IApiResponse<T> {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalCount: number;
  items: T,
  hasPrevious: boolean;
  hasNext: boolean;
}