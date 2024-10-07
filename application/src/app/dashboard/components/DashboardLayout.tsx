'use client';

// Libraries
import clsx from 'clsx';
import React, { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

// Components
import { OrganizationList } from '@/components/shared';
import { Button, Flex, Layout, Result } from '@/components/ui';
import { DashboardSider } from './DashboardSider';

// Hooks
import { useOrganization } from '@/hooks';

// Constants
import { DashboardHeader } from './DashboardHeader';
import { useAuthentication } from '@/hooks/useAuthentication';

const { Content } = Layout;

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const t = useTranslations();
  const { currentOrganizationId } = useOrganization();
  const { isAuthenticated, isLoading } = useAuthentication();
  const parentRef = useRef<HTMLDivElement>(null);
  const isShowSider = !!currentOrganizationId;

  const renderContent = () => {
    if (!isLoading && !isAuthenticated && !!currentOrganizationId) {
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

    return isShowSider ? children : <OrganizationList />;
  };

  return (
    <Layout id="dashboard-layout" className="h-screen p-4">
      <DashboardSider isShow={isShowSider} />
      <Flex
        ref={parentRef}
        vertical
        align="center"
        justify="center"
        className={clsx('size-full', {
          'pl-4': isShowSider,
        })}
      >
        <DashboardHeader isShowSider={isShowSider} />
        <Content className="container flex flex-col">{renderContent()}</Content>
      </Flex>
    </Layout>
  );
}
