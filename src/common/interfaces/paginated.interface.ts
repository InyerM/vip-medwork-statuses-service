export interface Paginated {
  take: number;
  page: number;
  sortBy?: string;
  sortDirection: 1 | -1;
  applyPagination?: boolean;
  applySort?: boolean;
}
