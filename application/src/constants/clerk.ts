// Types
import type { Appearance, Theme } from "@clerk/types";

// Constants
import { COLORS } from "./theme";

// Localizations
import { enUS, viVN } from "@clerk/localizations";

export const CLERK_APPEARANCE: Appearance<Theme> = {
  variables: {
    colorPrimary: COLORS.PRIMARY,
    borderRadius: "10px",
  },
  elements: {
    footer: {},
  },
};

export const MAP_CLERK_LOCALIZATION = {
  vi: viVN,
  en: enUS,
}