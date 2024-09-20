"use server";

// Libraries
import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

// Constants
import { COOKIES_KEYS } from "@/constants";

export default getRequestConfig(async () => {
  const cookieStore = cookies();
  const locale = cookieStore.get(COOKIES_KEYS.LANGUAGE)?.value || "en";

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
