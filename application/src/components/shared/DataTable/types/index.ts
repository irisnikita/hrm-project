// Types
import { TableProps, ButtonProps } from '@/components/ui';

export interface ToolbarProps {
  addButtonProps?: ButtonProps & {
    show?: boolean;
  };
}

export interface DataTableProps<DT = unknown> {
  toolbarProps?: ToolbarProps;
  tableProps?: TableProps<DT>;
}
