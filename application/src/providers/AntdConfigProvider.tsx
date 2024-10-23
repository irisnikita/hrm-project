'use client';

// Libraries
import { ConfigProvider, type ConfigProviderProps, theme } from 'antd';
import React from 'react';

// Components
import { Empty, Flex, Typography } from '@/components/ui';

// Constants
import { DARK_THEME, LIGHT_THEME } from '@/constants';

// Utils
import { getAntdLocale, getLanguage } from '@/utils';

// Hooks
import { useDarkMode } from '@/hooks';

const { Text } = Typography;

interface AntdConfigProviderProps extends ConfigProviderProps {}

export const AntdConfigProvider: React.FC<AntdConfigProviderProps> = props => {
  const locale = getLanguage();
  const { isDarkMode } = useDarkMode();

  const renderEmpty = () => {
    return <Empty />;
  };

  return (
    <ConfigProvider
      theme={{
        ...(isDarkMode ? DARK_THEME : LIGHT_THEME),
        algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
      renderEmpty={renderEmpty}
      form={{
        requiredMark: (label, info) => (
          <Flex align="center" gap={4}>
            {label}
            {info.required ? <Text type="danger">*</Text> : null}
          </Flex>
        ),
      }}
      locale={getAntdLocale(locale)}
      {...props}
    />
  );
};
