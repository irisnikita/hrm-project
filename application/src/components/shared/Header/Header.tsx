'use client';

// Libraries
import React, { RefObject } from 'react';
import clsx from 'clsx';
import Link from 'next/link';
// import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';

// Components
import { Button, Flex } from '@/components/ui';
import { UserButton as CusUserButton, DarkModeSwitcher } from '@/components/shared';
import { Logo } from '../Logo';
import { SignedOut, SignedIn } from '@clerk/nextjs';

// Styled
import { StyledHeader } from './styled';

// Hooks
import { useScrollPosition } from '@/hooks';

// const LanguageSwitcher = dynamic(
//   () => import('@/components/shared/LanguageSwitcher').then(mod => mod.LanguageSwitcher),
//   {
//     ssr: false,
//   },
// );

interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  isDashboard?: boolean;
  /** Reference to the parent element to calculate the scroll position */
  parentRef?: RefObject<HTMLElement>;
  /** Left content to be displayed on the left side of the header */
  leftContent?: React.ReactNode;
  /** Right content to be displayed on the right side of the header */
  rightContent?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = props => {
  const t = useTranslations();
  const { className, isDashboard, parentRef, leftContent, rightContent, ...restOfProps } = props;
  const { isScrolled } = useScrollPosition(0, parentRef);

  return (
    <StyledHeader
      $isScrolled={isScrolled}
      className={clsx(className, 'fixed w-full bg-transparent transition-all', {
        'shadow-sm shadow-slate-50': isScrolled,
      })}
      {...restOfProps}
    >
      <div
        className={clsx('mx-auto flex items-center justify-between p-4', {
          container: !isDashboard,
        })}
      >
        {leftContent ? leftContent : <Logo />}

        <Flex gap={16} align="center">
          <SignedOut>
            <Link href="/sign-in">
              <Button size="large">{t('common.logIn')}</Button>
            </Link>
            <Link href="/sign-up">
              <Button type="primary" size="large">
                {t('common.signUp')}
              </Button>
            </Link>
          </SignedOut>
          <SignedIn>
            {rightContent}

            {/* <LanguageSwitcher /> */}
            <CusUserButton />
            {/* <UserButton userProfileMode="navigation" userProfileUrl="/dashboard" /> */}
          </SignedIn>
        </Flex>
      </div>
    </StyledHeader>
  );
};
