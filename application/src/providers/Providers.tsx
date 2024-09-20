"use client";

// Libraries
import { enUS } from "@clerk/localizations";
import { ClerkProvider } from "@clerk/nextjs";
import React from "react";

// Providers
import { MotionConfig } from "framer-motion";
import { AntdConfigProvider } from "./AntdConfigProvider";
import ReactQueryProvider from "./ReactQueryProvider";

// Constants
import {
  CLERK_APPEARANCE,
  MAP_CLERK_LOCALIZATION,
  MOTION_CONFIG,
} from "@/constants";

// Components
import { PageTransition } from "@/components/shared";

// Utils
import { getLanguage } from "@/utils";

export const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
  const locale = getLanguage();

  return (
    <ReactQueryProvider>
      <ClerkProvider
        appearance={CLERK_APPEARANCE}
        localization={MAP_CLERK_LOCALIZATION[locale] || enUS}
      >
        <PageTransition>
          <AntdConfigProvider>
            <MotionConfig {...MOTION_CONFIG}>{children}</MotionConfig>
          </AntdConfigProvider>
        </PageTransition>
      </ClerkProvider>
    </ReactQueryProvider>
  );
};
