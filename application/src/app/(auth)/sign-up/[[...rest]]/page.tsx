"use client";

import { SignUp } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="neumorphism-section">
      <SignUp
        fallbackRedirectUrl="/"
        signInFallbackRedirectUrl="/"
        signInUrl="/sign-in"
      />
    </div>
  );
}
