// Libraries
import { Card as AntdCard, CardProps as AntdCardProps } from 'antd';
import React from 'react';

interface CardProps extends AntdCardProps {}

export const Card: React.FC<CardProps> = props => {
  const { children, bordered = false, ...restProps } = props;

  return (
    <AntdCard bordered={bordered} {...restProps}>
      {children}
    </AntdCard>
  );
};
