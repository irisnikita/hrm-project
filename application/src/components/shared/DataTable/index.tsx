'use client';

// Libraries
import React from 'react';

// Components
import { Table } from '@/components/ui';
import { Toolbar } from './components/Toolbar';

// Types
import { DataTableProps } from './types';

// Styled
import { DataTableWrapper } from './styled';

export function DataTable<DT>(props: DataTableProps<DT>) {
  const { tableProps, toolbarProps } = props;
  const { scroll, className: tableCalssName, ...restOfTableProps } = tableProps || {};

  return (
    <DataTableWrapper
      className="relative h-full overflow-auto"
      vertical
      gap={16}
      data-test="data-table"
    >
      <Toolbar {...toolbarProps} />
      <Table
        className={`${tableCalssName} h-full overflow-auto`}
        data-test="table"
        bordered={false}
        columns={[{}]}
        tableLayout="fixed"
        {...restOfTableProps}
        scroll={{ ...scroll, y: '100%' }}
      />
    </DataTableWrapper>
  );
}

// Hooks
export { useDataTable } from './hooks';

// Utils
export { renderStatus, renderDate } from './utils';
