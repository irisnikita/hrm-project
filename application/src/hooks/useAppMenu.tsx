// Libraries
import { useCallback, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

// Components
import { Typography } from '@/components/ui';

// Types
import { MENU, ROUTES } from '@/constants';

// Hooks
import { useOrganizationRole } from './useOrganizationRole';

const { Text } = Typography;

export const useAppMenu = () => {
  const t = useTranslations();
  const pathname = usePathname();
  const { role } = useOrganizationRole();

  // Handlers
  const renderItemLabel = useCallback(
    ({ routeInfo, item }: { routeInfo: any; item: any }) => {
      const { type, label } = item || {};
      const {} = routeInfo || {};

      if (type === 'group') {
        return t(label)?.toUpperCase();
      }

      if (type === 'submenu') {
        return <Text ellipsis={{ tooltip: true }}>{t(label)}</Text>;
      }

      if (routeInfo?.path) {
        return <Link href={routeInfo?.path}>{t(label)}</Link>;
      }

      return <Text ellipsis={{ tooltip: true }}>{t(label)}</Text>;
    },
    [t],
  );

  const recursiveMenu = useCallback(
    (menu: any[]) => {
      return menu
        .map((item: any) => {
          const routeInfo = ROUTES[item?.key];

          if (routeInfo?.roles.includes(role)) {
            return {
              ...item,
              label: renderItemLabel({ routeInfo, item }),
              children: item?.children ? recursiveMenu(item?.children) : undefined,
            };
          }

          return null;
        })
        ?.filter(Boolean);
    },
    [role, renderItemLabel],
  );

  // Memos
  const menuItems = useMemo(() => recursiveMenu(MENU), [recursiveMenu]);

  const selectedMenuKey = useMemo(() => {
    const routeInfo = Object.values(ROUTES).find(route => route.path === pathname);
    return routeInfo?.key || '1';
  }, [pathname]);

  return {
    menuItems,
    selectedMenuKey,
  };
};
