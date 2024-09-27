'use client';

import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
  return (
    <div className="glass-section authentication-wrapper">
      <SignIn
        fallbackRedirectUrl="/"
        signUpFallbackRedirectUrl="/"
        signUpUrl="/sign-up"
        appearance={{
          elements: {
            footer: {},
          },
        }}
      />
    </div>
  );
}
