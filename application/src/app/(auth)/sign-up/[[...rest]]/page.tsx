'use client';

import { SignUp as ClerkSignUp } from '@clerk/nextjs';

// Components
import { SignUp } from '@/components/shared';

export default function SignInPage() {
  return (
    <div className="glass-section gap-4">
      <ClerkSignUp fallbackRedirectUrl="/" signInFallbackRedirectUrl="/" signInUrl="/sign-in" />

      <SignUp />
    </div>
  );
}
