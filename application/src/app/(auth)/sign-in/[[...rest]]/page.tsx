'use client';

// Libraries
import { SignIn as ClerkSignIn } from '@clerk/nextjs';
import { useCallback } from 'react';

// Hooks
import { useCustomerAuth } from '@/hooks';

// Components
import { SignIn } from '@/components/shared';
import { Spin } from '@/components/ui';

// Constants
import { ROUTE_KEYS, ROUTES } from '@/constants';

export default function SignInPage() {
  const { organization, isLoading, isShowCustomerSignForm } = useCustomerAuth();

  const renderContent = useCallback(() => {
    if (isLoading) return <Spin />;

    if (isShowCustomerSignForm) {
      return <SignIn organization={organization} />;
    }

    return (
      <ClerkSignIn
        fallbackRedirectUrl="/"
        signUpFallbackRedirectUrl={ROUTES[ROUTE_KEYS.OVERVIEW].path}
        signUpUrl="/sign-up"
        appearance={{
          elements: {
            footer: {},
          },
        }}
      />
    );
  }, [isLoading, isShowCustomerSignForm, organization]);

  return <div className="glass-section authentication-wrapper">{renderContent()}</div>;
}
