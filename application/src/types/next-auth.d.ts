// types/next-auth.d.ts
import { DefaultSession, DefaultUser } from 'next-auth';
import { User as SystemUser } from '@/schemas';

declare module 'next-auth' {
  interface User extends DefaultUser, SystemUser {
    jwt: string;
  }

  /**
   * Thêm các thuộc tính tùy chỉnh cho `session` và `token`.
   */
  interface Session {
    jwt: string; // Thêm JWT vào session
    id: string; // ID của user
    user: SystemUser & DefaultSession['user'];
  }

  interface JWT {
    jwt: string; // Lưu JWT vào token
    id: string; // Lưu ID của user vào token
    username: string;
  }
}
