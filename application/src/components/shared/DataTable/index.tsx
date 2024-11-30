'use client';

// Libraries
import React from 'react';

// Components
import { Flex, Table } from '@/components/ui';
import { Toolbar } from './components/Toolbar';

// Types
import { DataTableProps } from './types';

export function DataTable<DT>(props: DataTableProps<DT>) {
  const { tableProps, toolbarProps } = props;
  const { scroll, ...restOfTableProps } = tableProps || {};

  return (
    <Flex className="relative h-full overflow-auto" vertical gap={8} data-test="data-table">
      <Toolbar {...toolbarProps} />
      <Table
        data-test="table"
        bordered={false}
        tableLayout="fixed"
        {...restOfTableProps}
        scroll={{ ...scroll, y: '100%' }}
      />
    </Flex>
  );
}

// Hooks
export { useDataTable } from './hooks';
