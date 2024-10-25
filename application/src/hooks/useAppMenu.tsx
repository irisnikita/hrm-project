// Libraries
import { useCallback, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

// Types
import { MENU, ROUTES } from '@/constants';

// Hooks
import { useOrganizationRole } from './useOrganizationRole';

export const useAppMenu = () => {
  const t = useTranslations();
  const pathname = usePathname();
  const { role } = useOrganizationRole();

  const recursiveMenu = useCallback(
    (menu: any[]) => {
      return menu
        .map((item: any) => {
          const routeInfo = ROUTES[item?.key];

          if (routeInfo?.roles.includes(role)) {
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

  return {
    menuItems,
    selectedMenuKey,
  };
};
