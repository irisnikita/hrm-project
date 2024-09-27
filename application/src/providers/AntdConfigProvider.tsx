'use client';

// Libraries
import { ConfigProvider, type ConfigProviderProps } from 'antd';
import React from 'react';

// Components
import { Empty } from '@/components/ui';

// Constants
import { THEME } from '@/constants';

// Utils
import { getAntdLocale, getLanguage } from '@/utils';

interface AntdConfigProviderProps extends ConfigProviderProps {}

export const AntdConfigProvider: React.FC<AntdConfigProviderProps> = props => {
  const locale = getLanguage();

  const renderEmpty = () => {
    return <Empty />;
  };

  return (
    <ConfigProvider
      theme={THEME}
      renderEmpty={renderEmpty}
      locale={getAntdLocale(locale)}
      {...props}
    />
  );
};
