'use client';

// Libraries
import { theme, ThemeConfig as AntdThemeConfig } from 'antd';

type ThemeConfig = Omit<AntdThemeConfig, 'token'> & {
  token: AntdThemeConfig['token'] & {
    colorSiderBg: string;
    colorGlassBgSecondary: string;
    colorTextWhite: string;
  };
};

export const COLORS = {
  PRIMARY: '#9254de',
  ERROR: '#EF3340',
  SUCCESS: '#12B800',
  WARNING: '#faad14',
  TEXT_COLOR: '#000000',
  TEXT_BASE: '#222222',
  TEXT_DARK: '#333333',
  TEXT_WHITE: '#ffffff',
  TEXT_PLACEHOLDER: '#BEBEBE',
  TEXT_DISABLED: '#999999',
  TEXT_HOVER: '#3a72b6',
  TEXT_QUATERNARY: '#666666',
  TEXT_ACTIVE: '#e0ebf7',
  TEXT_LINK: '#005eb8',
  GLASS_BG: '#ffffff50',
  GLASS_BG_2: '#ffffffb3',
  ACTIVE_OPTION_BG: '#919eab29',

  // Dark
  DARK_GLASS_BG: '#00000050',
  DARK_GLASS_BG_2: '#00000050',
  DARK_TEXT_COLOR: '#dfdfdf',
  DARK_TEXT_BASE: '#ffffff',
};
export const WIDTHS = {
  MODAL_DEFAULT_WIDTH: 400,
  DRAWER_MIN_WIDTH: 360,
};
export const RADIUS = {
  DEFAULT: 10,
};
export const FONT_SIZE = {
  DEFAULT: 14,
};
export const SHADOW = {
  DEFAULT: '0 0 10px rgba(0, 0, 0, 0.5)',
  TERTIARY: '0 4px 30px rgba(0, 0, 0, 0.1)',
};
export const FONT_FAMILY = {
  DEFAULT: 'inherit',
};
const {
  PRIMARY,
  // ERROR,
  SUCCESS,
  WARNING,
  TEXT_BASE,
  TEXT_PLACEHOLDER,
  TEXT_DISABLED,
  GLASS_BG,
  TEXT_QUATERNARY,
  TEXT_COLOR,
  ACTIVE_OPTION_BG,
  GLASS_BG_2,
  TEXT_WHITE,
  DARK_TEXT_COLOR,
  DARK_GLASS_BG_2,
  DARK_GLASS_BG,
  DARK_TEXT_BASE,
} = COLORS;

export const COMMON_THEME: ThemeConfig = {
  token: {
    // Colors
    colorPrimary: PRIMARY,
    // colorError: ERROR,
    colorSuccess: SUCCESS,
    colorWarning: WARNING,
    colorText: TEXT_BASE,
    colorTextBase: TEXT_BASE,
    colorTextPlaceholder: TEXT_PLACEHOLDER,
    colorTextDisabled: TEXT_DISABLED,
    colorTextQuaternary: TEXT_QUATERNARY,
    colorTextTertiary: TEXT_COLOR,
    colorLink: PRIMARY,
    borderRadius: RADIUS.DEFAULT,
    fontSize: FONT_SIZE.DEFAULT,

    colorSiderBg: GLASS_BG_2,
    colorGlassBgSecondary: GLASS_BG_2,

    colorTextWhite: TEXT_WHITE,

    fontFamily: FONT_FAMILY.DEFAULT,
  },
  components: {
    Divider: {
      marginLG: 16,
    },
    Menu: {
      activeBarBorderWidth: 0,
      itemBg: 'transparent',
      groupTitleFontSize: 12,
      itemMarginInline: 0,
    },
    Button: {
      fontWeight: 500,
      defaultBg: GLASS_BG,
      defaultHoverBg: '#ffffff36',
    },
    Avatar: {
      colorTextPlaceholder: PRIMARY,
    },
    Card: {
      // boxShadowTertiary: SHADOW.TERTIARY,
      colorBgContainer: GLASS_BG_2,
      borderRadius: 12,
      paddingLG: 16,
    },
    Input: {
      colorBgContainer: 'transparent',
    },
    Dropdown: {},
    Select: {
      colorBgContainer: GLASS_BG,
      optionSelectedBg: ACTIVE_OPTION_BG,
    },
    Spin: {
      contentHeight: '100%',
    },
    Slider: {},
    Tag: {
      lineHeightSM: 2,
    },
    Badge: {
      fontSizeSM: 10,
    },
    Drawer: {
      lineWidth: 0,
      colorBgMask: 'transparent',
    },
  },
  cssVar: true,
};

export const LIGHT_THEME: ThemeConfig = {
  ...COMMON_THEME,
};

export const DARK_THEME: ThemeConfig = {
  ...COMMON_THEME,
  token: {
    ...COMMON_THEME.token,
    colorSiderBg: DARK_GLASS_BG_2,
    colorGlassBgSecondary: DARK_GLASS_BG_2,
    colorText: DARK_TEXT_BASE,
    colorTextBase: DARK_TEXT_BASE,
    colorTextTertiary: DARK_TEXT_COLOR,
  },
  components: {
    ...COMMON_THEME.components,
    Menu: {
      ...COMMON_THEME.components?.Menu,
    },
    Card: {
      ...COMMON_THEME.components?.Card,
      colorBgContainer: DARK_GLASS_BG_2,
    },
    Button: {
      ...COMMON_THEME.components?.Button,
      defaultBg: DARK_GLASS_BG_2,
      defaultHoverBg: DARK_GLASS_BG,
    },
  },
};

export const GLOBAL_TOKEN: Partial<ThemeConfig['token']> =
  typeof theme?.getDesignToken === 'function'
    ? theme?.getDesignToken(LIGHT_THEME)
    : LIGHT_THEME.token;

export const STYLED_THEME = {
  ...GLOBAL_TOKEN,
  transition: 'all 0.3s ease-in-out',
};
