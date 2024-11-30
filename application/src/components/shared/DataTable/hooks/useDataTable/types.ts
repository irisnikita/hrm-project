// Types
import { ObjectType } from '@/types';

export type UseDataTableConfig = {
  objectType: ObjectType;
};

export type UseDataTableTable = {
  columns: any;
};

export type UseDataTableProps = {
  config: UseDataTableConfig;
  table?: UseDataTableTable;
};
