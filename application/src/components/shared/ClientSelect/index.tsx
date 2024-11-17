'use client';

// Libraries
import React, { useMemo } from 'react';

// Queries
import { useGetClientList, useGetProductList } from '@/queries';

// Components
import { Select, Spin, type SelectProps } from '@/components/ui';

interface ClientSelectProps extends SelectProps {}

export const ClientSelect: React.FC<ClientSelectProps> = props => {
  const { ...restProps } = props;

  // Queries
  const { data: clientListData, isLoading } = useGetClientList({
    args: {
      params: {},
    },
  });

  // Memos
  const options = useMemo(() => {
    const { data } = clientListData || {};

    return (
      data?.map(({ attributes, id }) => ({
        value: id,
        label: attributes.clientName,
      })) || []
    );
  }, [clientListData]);

  return (
    <Spin spinning={isLoading}>
      <Select showSearch options={options} loading={isLoading} {...restProps} />
    </Spin>
  );
};
