// Libraries
import React from 'react';

// Components
import { Table, TableProps } from '@/components/ui';

interface DataTableProps {
  tableProps: TableProps;
}

export const DataTable: React.FC<DataTableProps> = props => {
  const { tableProps, ...restProps } = props;

  return (
    <>
      <Table {...tableProps} />
    </>
  );
};
