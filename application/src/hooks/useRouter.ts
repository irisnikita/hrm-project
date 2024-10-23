'use client';

import { useRouter as useNextRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

export const useRouter = () => {
  const searchParams = useSearchParams();
  const router = useNextRouter();

  /**
   * Pushes a new pathname to the router while preserving the current search query parameters.
   *
   * @param pathname - The pathname to navigate to.
   */
  const pushKeepSearchQuery = useCallback(
    (pathname: string) => {
      router.push(`${pathname}${!!searchParams.toString() ? `?${searchParams.toString()}` : ''}`);
    },
    [router, searchParams],
  );

  return {
    ...router,
    pushKeepSearchQuery,
  };
};
