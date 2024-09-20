// Libraries
import { ThemeConfig /* theme */ } from "antd";

export const COLORS = {
  PRIMARY: "#13c2c2",
  ERROR: "#EF3340",
  SUCCESS: "#12B800",
  WARNING: "#faad14",
  TEXT_BASE: "#222222",
  TEXT_DARK: "#333333",
  TEXT_PLACEHOLDER: "#BEBEBE",
  TEXT_DISABLED: "#999999",
  TEXT_HOVER: "#3a72b6",
  TEXT_ACTIVE: "#e0ebf7",
  TEXT_LINK: "#005eb8",
};
export const RADIUS = {
  DEFAULT: 10,
};
export const FONT_SIZE = {
  DEFAULT: 14,
};
const {
  PRIMARY,
  ERROR,
  SUCCESS,
  WARNING,
  TEXT_BASE,
  TEXT_PLACEHOLDER,
  TEXT_DISABLED,
} = COLORS;

export const THEME: ThemeConfig = {
  token: {
    // Colors
    colorPrimary: PRIMARY,
    colorError: ERROR,
    colorSuccess: SUCCESS,
    colorWarning: WARNING,
    colorTextBase: TEXT_BASE,
    colorTextPlaceholder: TEXT_PLACEHOLDER,
    colorTextDisabled: TEXT_DISABLED,

    borderRadius: RADIUS.DEFAULT,
    fontSize: FONT_SIZE.DEFAULT,
  },
  components: {
    Menu: {
      activeBarBorderWidth: 0,
    },
    Button: {
      fontWeight: 500,
    },
    Slider: {},
  },
  cssVar: true,
};

// export const GLOBAL_TOKEN = theme?.getDesignToken(THEME);
