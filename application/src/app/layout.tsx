// Libraries
import { AntdRegistry } from "@ant-design/nextjs-registry";
// import {
//   ClerkProvider,
//   SignedIn,
//   SignedOut,
//   SignInButton,
//   UserButton,
// } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";

// Styles
import "@/styles/main.scss";

// Libs
import StyledComponentsRegistry from "@/lib/registry";

// Providers
import { Providers } from "@/providers";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={quicksand.className}>
        <NextIntlClientProvider messages={messages}>
          <StyledComponentsRegistry>
            <AntdRegistry>
              <Providers>{children}</Providers>
            </AntdRegistry>
          </StyledComponentsRegistry>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
