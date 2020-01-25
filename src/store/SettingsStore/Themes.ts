export type ThemeColors = {
  SITE_BG: string;
  UI_BG: string;
  PRIMARY: string;
  PRIMARY_10: string;
  PRIMARY_BLACK: string;
  BORDER: string;
  SUCCESS: string;
  ERROR: string;
  WARNING: string;
  GREY: string;
  TEXT: string;
  NAV_HOVER: string;
  NADE_ITEM_HIGHLIGHT: string;
};

type Themes = {
  dark: ThemeColors;
  light: ThemeColors;
};

export const themes: Themes = {
  dark: {
    SITE_BG: "#404040",
    UI_BG: "#212121",
    PRIMARY: "rgba(28, 143, 192, 1)",
    PRIMARY_10: "rgba(28, 143, 192, 0.1)",
    PRIMARY_BLACK: "#262626",
    BORDER: "rgba(0, 0, 0, 1)",
    SUCCESS: "#8cc01c",
    ERROR: "#c01c1c",
    WARNING: "#c05b1c",
    GREY: "#bbb",
    TEXT: "white",
    NAV_HOVER: "rgba(28, 143, 192, 0.1)",
    NADE_ITEM_HIGHLIGHT: "#009982"
  },
  light: {
    SITE_BG: "#f3f3f3",
    UI_BG: "white",
    PRIMARY: "#1c90c0",
    PRIMARY_10: "rgba(28, 143, 192, 0.1)",
    PRIMARY_BLACK: "#262626",
    BORDER: "rgba(0, 0, 0, 0.1)",
    SUCCESS: "#8cc01c",
    ERROR: "#c01c1c",
    WARNING: "#c05b1c",
    GREY: "#bbb",
    TEXT: "#262626",
    NAV_HOVER: "#f7f7f7",
    NADE_ITEM_HIGHLIGHT: "#690000"
  }
};

export type ThemeKeys = keyof typeof themes;
