// Libraries
import { getCookie, setCookie } from 'cookies-next';
import { Locale } from 'antd/es/locale';

// Locales
import vi_VN from 'antd/locale/vi_VN';
import en_US from 'antd/locale/en_US';
import vi from '@/messages/vi.json';
import en from '@/messages/en.json';

// Constants
import { COOKIES_KEYS, LOCALES } from '@/constants';

export function getLanguage(): string {
  // Client-side
  return (getCookie(COOKIES_KEYS.LANGUAGE) as string) || 'en';
}

export function setLanguage(locale: string): void {
  setCookie(COOKIES_KEYS.LANGUAGE, locale, { maxAge: 31536000 }); // maxAge: 1 year
}

export function getAntdLocale(locale: string): Locale {
  switch (locale) {
    case LOCALES.VI:
      return {
        ...vi_VN,
        Form: {
          defaultValidateMessages: {
            ...vi_VN?.Form?.defaultValidateMessages,
            ...vi.validateMessages,
          },
        },
      };
    case LOCALES.EN:
      return {
        ...en_US,
        Form: {
          defaultValidateMessages: {
            ...en_US?.Form?.defaultValidateMessages,
            ...en.validateMessages,
          },
        },
      };
    default:
      return en_US;
  }
}
