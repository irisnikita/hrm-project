// Libraries
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

// Services
import { authServices } from './services/auth';

export const { handlers, signIn, signOut, auth } = NextAuth({
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

          const res = await authServices.signIn({
            identifier: identifier as string,
            password: password as string,
          });

          if (res.user) {
            return {
              ...res.user,
              jwt: res.jwt,
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
