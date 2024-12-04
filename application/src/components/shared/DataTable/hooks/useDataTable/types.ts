// Types
import { ObjectType } from '@/types';
import { ColumnType, TableProps } from 'antd/es/table';

export type UseDataTableConfig = {
  objectType: ObjectType;
};

export type UseDataTableTable<DT = any> = {
  columns: {
    [K in keyof DT | 'toggle']?: ColumnType<DT>;
  };
};

export type UseDataTableProps<DT = any> = {
  config: UseDataTableConfig;
  table?: UseDataTableTable<DT>;
};

export interface UseDataTable<DT = any> {
  table: TableProps<DT>;
}
