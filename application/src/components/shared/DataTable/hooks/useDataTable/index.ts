'use client';

// Libraries
import { isEmpty } from 'lodash';
import { useMemo } from 'react';
import { useImmer } from 'use-immer';
import { keepPreviousData } from '@tanstack/react-query';

// Types
import { UseDataTableProps } from './types';

// Queries
import { useGetDataTableList } from '@/queries';
import { OBJECT_COLUMNS } from '@/constants';

const initialState = {
  pagination: {
    pageSize: 10,
    page: 1,
  },
};

export const useDataTable = <DT = any>(props: UseDataTableProps) => {
  const { config } = props;

  const [state, setState] = useImmer(initialState);

  // Variables
  const { objectType } = config;
  const { pagination: paginationState } = state;

  const { data, isLoading, isFetching } = useGetDataTableList<DT>({
    args: {
      objectType,
      params: {
        'pagination[page]': paginationState.page,
        'pagination[pageSize]': paginationState.pageSize,
        'sort[0]': 'createdAt:desc',
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
    return OBJECT_COLUMNS[objectType] || [];
  }, [objectType]);

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

  return {
    table: {
      dataSource,
      columns,
      pagination,
      loading: isLoading || isFetching,
    },
  };
};
