// Libraries
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { createRouteMatcher } from '@clerk/nextjs/server';

// Constants
import { APP_CONFIG } from './constants';
import { NextResponse } from 'next/server';

const isProtectedRoute = createRouteMatcher(['/dashboard(.*)']);
const isAuthRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)']);

const checkToken = async (jwt: string) => {
  const response = await fetch(`${APP_CONFIG.API_URL}/auth/validate-token`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  const { data: isValidToken } = (await response.json()) || {};

  return isValidToken;
};

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  providers: [
    CredentialsProvider({
      name: 'Strapi Credentials',
      credentials: {
        identifier: { label: 'Email or phone', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          const { identifier, password } = credentials || {};

          const res = await fetch(`${APP_CONFIG.API_URL}/auth/local`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              identifier: identifier as string,
              password: password as string,
            }),
          });

          const response: any = await res.json();

          if (response.user) {
            return {
              ...response.user,
              jwt: response.jwt,
            } as any;
          } else {
            throw new Error('Invalid credentials');
          }
        } catch {
          throw new Error('Invalid credentials');
        }
      },
    }),
  ],
  pages: {
    signIn: '/sign-in',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.jwt = user.jwt;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.jwt = token.jwt as string;
      session.id = token.id as string;
      return session;
    },
    async authorized({ request, auth }) {
      const { jwt } = auth || {};
      // If the request is for an authentication route (e.g. /sign-in) and
      // the user is already authenticated, redirect them to the dashboard
      // after checking that the token is valid.
      if (isAuthRoute(request) && jwt) {
        const isValidToken = await checkToken(jwt);

        if (isValidToken) {
          return NextResponse.redirect(new URL('/dashboard', request.url));
        }
      }

      // If the request is for a protected route (e.g. /dashboard) and
      // there is no token, redirect to the sign-in page.
      // If there is a token, check that it is valid. If it is not,
      // redirect to the sign-in page.
      if (isProtectedRoute(request)) {
        // Get current url for redirect if not authenticated
        const signInUrl = new URL('/sign-in', request.url);
        signInUrl.searchParams.set('redirect-to', request.nextUrl.pathname);

        if (!jwt) {
          return NextResponse.redirect(signInUrl);
        }

        if (jwt) {
          const isValidToken = await checkToken(jwt);

          if (!isValidToken) {
            return NextResponse.redirect(signInUrl);
          }
        }
      }

      return true;
    },
  },
});
