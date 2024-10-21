'use client';

// Libraries
import { SignUp as ClerkSignUp } from '@clerk/nextjs';

// Components
import { SignUp } from '@/components/shared';
import { Spin } from '@/components/ui';

// Hooks
import { useCustomerAuth } from '@/hooks';

export default function SignInPage() {
  const { organization, isLoading, isShowCustomerSignForm } = useCustomerAuth();

  return (
    <div className="glass-section gap-4">
      {isLoading && <Spin />}
      {isShowCustomerSignForm && !isLoading ? (
        <SignUp organization={organization} />
      ) : (
        <ClerkSignUp fallbackRedirectUrl="/" signInFallbackRedirectUrl="/" signInUrl="/sign-in" />
      )}
    </div>
  );
}
