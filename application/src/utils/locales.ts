// Libraries
import { getCookie, setCookie } from "cookies-next";

// Constants
import { COOKIES_KEYS } from "@/constants";

export function getLanguage(): string {
  // Client-side
  return (getCookie(COOKIES_KEYS.LANGUAGE) as string) || "en";
}

export function setLanguage(locale: string): void {
  setCookie(COOKIES_KEYS.LANGUAGE, locale, { maxAge: 31536000 }); // maxAge: 1 year
}
