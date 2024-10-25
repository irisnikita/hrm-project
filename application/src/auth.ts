// Libraries
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

// Constants
import { APP_CONFIG } from './constants';

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
      console.log('🚀 ~ jwt ~ token:', token);
      console.log('🚀 ~ jwt ~ user:', user);
      if (user) {
        token.jwt = user.jwt;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      console.log('🚀 ~ session ~ token:', token);
      session.jwt = token.jwt as string;
      session.id = token.id as string;
      return session;
    },
    authorized(params) {
      console.log('🚀 ~ authorized ~ params:', params);

      return true;
    },
  },
});
