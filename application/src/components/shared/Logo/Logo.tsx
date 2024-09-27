'use client';

// Libraries
import { memo } from 'react';
import styled from 'styled-components';

// Components
import { Flex, FlexProps, Typography } from '@/components/ui';

const { Text } = Typography;

const LogoWrapper = styled(Flex)``;

export const Logo = memo((props: Omit<FlexProps, 'children'>) => {
  return (
    <LogoWrapper align="center" {...props}>
      <Text className="!text-2xl font-bold">Compily</Text>
    </LogoWrapper>
  );
});

Logo.displayName = 'Logo';
