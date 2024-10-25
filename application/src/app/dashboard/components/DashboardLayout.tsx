'use client';

// Libraries
import clsx from 'clsx';
import React, { useMemo, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { User } from '@clerk/nextjs/server';

// Components
import { OrganizationList, UserRequiredInfoForm } from '@/components/shared';
import { Button, Flex, Layout, Result, Spin } from '@/components/ui';
import { DashboardSider } from './DashboardSider';

// Hooks
import { useDeepCompareEffect, useOrganization, useUser, useAuthentication } from '@/hooks';

// Constants
import { DashboardHeader } from './DashboardHeader';

// Utils
import { checkIsMissingRequiredInfo, mapClerkUserToCreateUserDto } from '@/utils';

// Services
import { userService } from '@/services';
import { signIn } from 'next-auth/react';
import { APP_CONFIG } from '@/constants';

const { Content } = Layout;

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const t = useTranslations();
  const { user, session, clerkUser, isLoading: isUserLoading, isSignedIn, isLoaded } = useUser();
  const { currentOrganization, isLoading: isOrganizationLoading } = useOrganization();
  const { isAuthenticated, isLoading: isAuthenticatedLoading } = useAuthentication();
  const parentRef = useRef<HTMLDivElement>(null);
  const isHasCurrentOrganization = !!currentOrganization;

  // Memo
  const isMissingRequiredInfo = useMemo(() => {
    return checkIsMissingRequiredInfo(user);
  }, [user]);

  const isCanAccessDashboard = useMemo(() => {
    return isHasCurrentOrganization && !isMissingRequiredInfo;
  }, [isHasCurrentOrganization, isMissingRequiredInfo]);

  // Effects
  /**
   * Migrate cleck user to strapi/system user
   * Check if username is available then call api to create user in strapi system
   * if username is not available then check nextAuth session is exist, if not call api sign in to get token
   */
  useDeepCompareEffect(() => {
    (async () => {
      if (isSignedIn && !!clerkUser && isLoaded) {
        const { username, emailAddresses } = clerkUser;
        const email = emailAddresses?.[0]?.emailAddress || '';

        if (!username && !email) return;

        const { available = true } =
          (await userService.checkUserName(username || email || '')).data || {};

        // If username is available then create user
        if (available) {
          const userData = mapClerkUserToCreateUserDto(clerkUser as unknown as User);

          userService.createUser(userData);
        } else {
          // Check if nextAuth session is exist then not sign in
          if (session?.data?.jwt) return;

          const identifier = username || email || '';

          await signIn('credentials', {
            redirect: false,
            identifier,
            password: APP_CONFIG.CLERK_PASSWORD_DEFAULT,
          });
        }
      }
    })();
  }, [isSignedIn, session?.data?.jwt, clerkUser, isLoaded]);

  const renderContent = () => {
    if (isAuthenticatedLoading || isUserLoading || isOrganizationLoading) {
      return <Spin rootClassName="!m-auto" />;
    }

    // Render UserRequiredInfoField
    if (isMissingRequiredInfo) {
      return <UserRequiredInfoForm />;
    }

    // Render no permission
    if (!isAuthenticated && !!currentOrganization) {
      return (
        <Result
          status="404"
          className="m-auto"
          title={t('noPermission.title')}
          subTitle={t('noPermission.description')}
          extra={
            <Button type="primary" onClick={() => router.push('/')}>
              {t('common.backHome')}
            </Button>
          }
        />
      );
    }

    // Render OrganizationList
    if (!isHasCurrentOrganization) {
      return <OrganizationList />;
    }

    return children;
  };

  return (
    <Layout id="dashboard-layout" className="h-screen p-4">
      <DashboardSider isShow={isCanAccessDashboard} />
      <Flex
        ref={parentRef}
        vertical
        align="center"
        justify="center"
        className={clsx('size-full', {
          'pl-4': isCanAccessDashboard,
        })}
      >
        <DashboardHeader isShowSider={isCanAccessDashboard} />
        <Content className="container flex flex-col">{renderContent()}</Content>
      </Flex>
    </Layout>
  );
}
