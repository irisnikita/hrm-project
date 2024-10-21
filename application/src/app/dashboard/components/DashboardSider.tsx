'use client';

// Libraries
import React, { memo, useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { SiderProps, theme } from 'antd';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

// Components
import { Layout, Menu } from '@/components/ui';
import { Logo } from '@/components/shared';

// Constants
import { GLOBAL_TOKEN, MENU, ROUTES } from '@/constants';

// Hooks
import { useOrganizationRole } from '@/hooks';

interface DashboardSiderProps extends SiderProps {
  isShow?: boolean;
}

const { borderRadiusLG, boxShadowTertiary } = GLOBAL_TOKEN;

// Styled
const StyledSider = styled(Layout.Sider)`
  border-radius: ${borderRadiusLG}px !important;
  box-shadow: ${boxShadowTertiary} !important;
  backdrop-filter: var(--bg-filter-blur);
`;

export const DashboardSider: React.FC<DashboardSiderProps> = memo(props => {
  const { collapsed, isShow } = props;

  const t = useTranslations();
  const { token } = theme.useToken();
  const pathname = usePathname();
  const { role } = useOrganizationRole();

  const recursiveMenu = useCallback(
    (menu: any[]) => {
      return menu
        .map((item: any) => {
          const routeInfo = ROUTES[item?.key];

          if (item.type === 'group' || routeInfo?.roles.includes(role)) {
            return {
              ...item,
              label:
                item?.type === 'group' ? (
                  t(item?.label)?.toUpperCase()
                ) : (
                  <Link href={routeInfo?.path}>{t(item?.label)}</Link>
                ),
              children: item?.children ? recursiveMenu(item?.children) : undefined,
            };
          }

          return null;
        })
        ?.filter(Boolean);
    },
    [t, role],
  );

  // Memos
  const menuItems = useMemo(() => recursiveMenu(MENU), [recursiveMenu]);

  const selectedMenuKey = useMemo(() => {
    const routeInfo = Object.values(ROUTES).find(route => route.path === pathname);
    return routeInfo?.key || '1';
  }, [pathname]);

  return isShow ? (
    <StyledSider
      trigger={null}
      collapsible
      collapsed={collapsed}
      width={250}
      className="px-4"
      style={{
        backgroundColor: (token as any)?.colorSiderBg,
      }}
    >
      <Logo className="h-[64px]" />
      <Menu inlineIndent={16} mode="inline" selectedKeys={[selectedMenuKey]} items={menuItems} />
    </StyledSider>
  ) : null;
});

DashboardSider.displayName = 'DashboardSider';
