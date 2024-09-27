import { getTranslations } from 'next-intl/server';

let t: any;

export async function initializeTranslations() {
  t = await getTranslations();
}

export function translate(key: string, defaultValue?: string, options?: any) {
  if (!t) {
    return defaultValue ?? '';
    // throw new Error('Translations not initialized. Call initializeTranslations first.');
  }
  return t(key, defaultValue, options);
}
