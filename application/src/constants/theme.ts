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
  PRIMARY: '#13c2c2',
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
};
export const WIDTH = {
  MODAL_DEFAULT_WIDTH: 400,
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
  DEFAULT: '__Quicksand_17bebb, __Quicksand_Fallback_17bebb',
};
const {
  PRIMARY,
  ERROR,
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
} = COLORS;

export const THEME: ThemeConfig = {
  token: {
    // Colors
    colorPrimary: PRIMARY,
    colorError: ERROR,
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
  },
  cssVar: true,
};

export const GLOBAL_TOKEN: Partial<ThemeConfig['token']> =
  typeof theme?.getDesignToken === 'function' ? theme?.getDesignToken(THEME) : THEME.token;

export const STYLED_THEME = {
  ...GLOBAL_TOKEN,
  transition: 'all 0.3s ease-in-out',
};
