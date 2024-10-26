// Libraries
import { NextResponse } from 'next/server';

// Auth
import { auth as NextAuth } from '@/auth';

// Constants
import { APP_CONFIG } from './constants';

// Utils
import { createRouteMatcher } from './utils';

const isProtectedRoute = createRouteMatcher(['/dashboard(.*)']);
const isAuthRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)']);

export default NextAuth(async req => {
  const session = await NextAuth();
  const { jwt } = session || {};
  const response = await fetch(`${APP_CONFIG.API_URL}/auth/validate-token`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });

  const { data: isValidToken } = (await response.json()) || {};

  if (isAuthRoute(req) && isValidToken) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  if (isProtectedRoute(req) && !isValidToken) {
    return NextResponse.redirect(new URL('/sign-in', req.url));
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
