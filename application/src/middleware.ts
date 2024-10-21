// Libraries
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

// Auth
import { auth as NextAuth } from '@/auth';

const isProtectedRoute = createRouteMatcher(['/dashboard(.*)']);
const isAuthRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)']);

export default clerkMiddleware(async (auth, req: NextRequest) => {
  const session = await NextAuth();

  if (isAuthRoute(req) && session) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  if (isProtectedRoute(req)) {
    if (session) {
      // TODO: CHECK TOKEN IN HERE
    } else {
      auth().protect();
    }
  }
});

// export default function nextAuthmiddleware(req, res) {

// }

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
