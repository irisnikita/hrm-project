'use client';

// Libraries
import { enUS } from '@clerk/localizations';
import { ClerkProvider } from '@clerk/nextjs';
import React, { useEffect } from 'react';
import { App } from 'antd';

// Providers
import { MotionConfig } from 'framer-motion';
import { AntdConfigProvider } from './AntdConfigProvider';
import ReactQueryProvider from './ReactQueryProvider';
import { SessionProvider } from 'next-auth/react';

// Constants
import { CLERK_APPEARANCE, MAP_CLERK_LOCALIZATION, MOTION_CONFIG, STYLED_THEME } from '@/constants';

// Components
// import { PageTransition } from '@/components/shared';

// Utils
import { getLanguage } from '@/utils';
import { ThemeProvider } from 'styled-components';
import { useDarkMode } from '@/hooks';

export const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
  const locale = getLanguage();
  const { isDarkMode } = useDarkMode();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.removeAttribute('data-theme');
    }
  }, [isDarkMode]);

  return (
    <ReactQueryProvider>
      <SessionProvider>
        <ClerkProvider
          appearance={CLERK_APPEARANCE}
          localization={MAP_CLERK_LOCALIZATION[locale] || enUS}
        >
          <ThemeProvider theme={STYLED_THEME || {}}>
            {/* <PageTransition> */}
            <AntdConfigProvider>
              <App>
                <MotionConfig {...MOTION_CONFIG}>{children}</MotionConfig>
              </App>
            </AntdConfigProvider>
            {/* </PageTransition> */}
          </ThemeProvider>
        </ClerkProvider>
      </SessionProvider>
    </ReactQueryProvider>
  );
};
