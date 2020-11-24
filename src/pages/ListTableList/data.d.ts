export interface TableListItem {
  id: number;
  name: string;
  amount: number;
}

export interface TableListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface TableListData {
  list: TableListItem[];
  pagination: Partial<TableListPagination>;
}

export interface TableListParams {
  name?: string;
  id?: number;
  amount?: number;
  pageSize?: number;
  currentPage?: number;
  filter?: { [id: string]: any[] };
  sorter?: { [id: string]: any };
}
