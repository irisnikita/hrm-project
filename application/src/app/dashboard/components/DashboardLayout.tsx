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
import { useOrganization, useUser } from '@/hooks';

// Constants
import { DashboardHeader } from './DashboardHeader';
import { useAuthentication } from '@/hooks/useAuthentication';

// Utils
import { checkIsMissingRequiredInfo } from '@/utils';

const { Content } = Layout;

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const t = useTranslations();
  const { user } = useUser();
  const { currentOrganization, isLoading: isOrganizationLoading } = useOrganization();
  const { isAuthenticated, isLoading } = useAuthentication();
  const parentRef = useRef<HTMLDivElement>(null);
  const isHasCurrentOrganization = !!currentOrganization;

  // Memo
  const isMissingRequiredInfo = useMemo(() => {
    return checkIsMissingRequiredInfo(user);
  }, [user]);

  const isCanAccessDashboard = useMemo(() => {
    return isHasCurrentOrganization && !isMissingRequiredInfo;
  }, [isHasCurrentOrganization, isMissingRequiredInfo]);

  const renderContent = () => {
    if (isLoading && isOrganizationLoading) {
      return <Spin rootClassName="!m-auto" />;
    }

    // Render UserRequiredInfoField
    if (isMissingRequiredInfo) {
      return <UserRequiredInfoForm />;
    }

    // Render no permission
    if (!isLoading && !isAuthenticated && !!currentOrganization) {
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
