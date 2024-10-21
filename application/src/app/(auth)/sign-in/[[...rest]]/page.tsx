'use client';

// Libraries
import { SignIn as ClerkSignIn } from '@clerk/nextjs';

// Hooks
import { useCustomerAuth } from '@/hooks';

// Components
import { SignIn } from '@/components/shared';
import { Spin } from '@/components/ui';

export default function SignInPage() {
  const { organization, isLoading, isShowCustomerSignForm } = useCustomerAuth();

  return (
    <div className="glass-section authentication-wrapper">
      {isLoading && <Spin />}
      {isShowCustomerSignForm && !isLoading ? (
        <SignIn organization={organization} />
      ) : (
        <ClerkSignIn
          fallbackRedirectUrl="/"
          signUpFallbackRedirectUrl="/"
          signUpUrl="/sign-up"
          appearance={{
            elements: {
              footer: {},
            },
          }}
        />
      )}
    </div>
  );
}
