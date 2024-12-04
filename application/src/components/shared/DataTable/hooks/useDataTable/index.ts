'use client';

// Libraries
import { keepPreviousData } from '@tanstack/react-query';
import { isEmpty } from 'lodash';
import { useMemo } from 'react';
import { useImmer } from 'use-immer';

// Types
import { UseDataTable, UseDataTableProps } from './types';
import { TableProps } from '@/components/ui';
import { SorterResult } from 'antd/es/table/interface';

// Queries
import { useGetDataTableList } from '@/queries';

// Constants
import { OBJECT_COLUMNS } from '@/constants';
import { mapApiSortOrder } from '@/utils';

type TState<DT = any> = {
  pagination: {
    pageSize: number;
    page: number;
  };
  sorter: SorterResult<DT>;
};

const initialState = {
  pagination: {
    pageSize: 10,
    page: 1,
  },
  sorter: {},
};

export const useDataTable = <DT = any>(props: UseDataTableProps<DT>): UseDataTable<DT> => {
  const { config, table } = props;

  const [state, setState] = useImmer<TState<DT>>(initialState);

  // Variables
  const { objectType } = config;
  const { columns: tableColumns } = table || {};
  const { pagination: paginationState, sorter } = state;

  const { data, isLoading, isFetching } = useGetDataTableList<DT>({
    args: {
      objectType,
      params: {
        'pagination[page]': paginationState.page,
        'pagination[pageSize]': paginationState.pageSize,
        ...(sorter?.columnKey && sorter?.order
          ? {
              'sort[0]': `${sorter.columnKey}:${mapApiSortOrder(sorter.order)}`,
            }
          : {
              'sort[0]': 'createdAt:desc',
            }),
      },
    },
    options: {
      placeholderData: keepPreviousData,
    },
  });
  const { data: tableData, meta } = data || {};

  // Memos
  const dataSource = useMemo(() => {
    if (!isEmpty(tableData)) {
      return tableData?.map((record: any) => ({ ...record.attributes, key: record.id }));
    }

    return [];
  }, [tableData]);

  const columns = useMemo(() => {
    return (
      OBJECT_COLUMNS[objectType]?.map(column => {
        const configColumn = tableColumns?.[column.key as any];
        const sortOrder = sorter?.columnKey === column.key ? sorter?.order : undefined;

        return {
          ...column,
          ...configColumn,
          sortOrder,
        };
      }) || []
    );
  }, [objectType, sorter?.columnKey, sorter?.order, tableColumns]);

  const pagination = {
    total: meta?.pagination?.total,
    pageSize: state.pagination.pageSize,
    onChange(page, pageSize) {
      setState(draft => {
        draft.pagination.page = page;
        draft.pagination.pageSize = pageSize;
      });
    },
  };

  const onChangeTable: TableProps<DT>['onChange'] = (_pagination, _filters, sorter) => {
    if (!isEmpty(sorter)) {
      setState(draft => {
        draft.sorter = sorter as any;
      });
    }
  };

  return {
    table: {
      dataSource,
      columns,
      pagination,
      loading: isLoading || isFetching,
      onChange: onChangeTable,
    },
  };
};
