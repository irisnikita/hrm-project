'use client';

// Libraries
import clsx from 'clsx';
import React, { useMemo, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

// Components
import { OrganizationList, UserRequiredInfoForm } from '@/components/shared';
import { Button, Flex, Layout, Result, Spin } from '@/components/ui';
import { DashboardSider } from './DashboardSider';

// Hooks
import { useOrganization, useUser, useAuthentication } from '@/hooks';

// Constants
import { DashboardHeader } from './DashboardHeader';

// Utils
import { checkIsMissingRequiredInfo } from '@/utils';

const { Content } = Layout;

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const t = useTranslations();
  const { user, isLoading: isUserLoading } = useUser();
  const { currentOrganization, isLoading: isOrganizationLoading } = useOrganization();
  const { isAuthenticated, isLoading: isAuthenticatedLoading } = useAuthentication();
  const parentRef = useRef<HTMLDivElement>(null);
  const isHasCurrentOrganization = !!currentOrganization;
  const isAnyLoading = isAuthenticatedLoading || isUserLoading || isOrganizationLoading;

  // Memo
  const isMissingRequiredInfo = useMemo(() => {
    return checkIsMissingRequiredInfo(user);
  }, [user]);

  const isCanAccessDashboard = useMemo(() => {
    return isHasCurrentOrganization && !isMissingRequiredInfo;
  }, [isHasCurrentOrganization, isMissingRequiredInfo]);

  const renderContent = () => {
    if (isAnyLoading) return <Spin rootClassName="!m-auto" />;

    // Render UserRequiredInfoField
    if (isMissingRequiredInfo) return <UserRequiredInfoForm />;

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
    if (!isHasCurrentOrganization) return <OrganizationList />;

    return children;
  };

  return (
    <Layout id="dashboard-layout" className="h-screen p-4 gap-4">
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
