'use client';

// Libraries
import React, { useMemo } from 'react';

// Queries
import { useGetProductList } from '@/queries';

// Components
import { Select, Spin, type SelectProps } from '@/components/ui';

interface ProductSelectProps extends SelectProps {}

export const ProductSelect: React.FC<ProductSelectProps> = props => {
  const { ...restProps } = props;

  // Queries
  const { data: productListData, isLoading } = useGetProductList({
    args: {
      params: {},
    },
  });

  // Memos
  const options = useMemo(() => {
    const { data } = productListData || {};

    return (
      data?.map(({ attributes, id }) => ({
        value: id,
        label: attributes.productName,
        points: attributes.points,
      })) || []
    );
  }, [productListData]);

  return (
    <Spin spinning={isLoading}>
      <Select showSearch options={options} loading={isLoading} {...restProps} />
    </Spin>
  );
};