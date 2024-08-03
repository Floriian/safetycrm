export interface TableCol<T = unknown> {
  name: keyof T;
  headerName: string;
}
export type TableCols<T> = TableCol<T>[];
