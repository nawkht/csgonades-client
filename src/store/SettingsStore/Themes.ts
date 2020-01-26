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
  nadeItemHeadingBg: string;
  footerBg: string;
  footerColor: string;
  primaryBtnBg: string;
  primaryBtnHover: string;
  filterBg: string;
  filterBgHover: string;
  filterColor: string;
  filterFavColor: string;
  filterResetBg: string;
  filterResetDisabledBg: string;
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
    NADE_ITEM_HIGHLIGHT: "#009982",
    nadeItemHeadingBg: "rgba(0, 0, 0, 1)",
    footerBg: "#212121",
    footerColor: "white",
    primaryBtnBg: "rgba(28, 143, 192, 0.85)",
    primaryBtnHover: "rgba(28, 143, 192, 1)",
    filterBg: "#292929",
    filterBgHover: "#151515",
    filterColor: "white",
    filterFavColor: "#ebda49",
    filterResetBg: "#6e0000",
    filterResetDisabledBg: "#544242"
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
    NADE_ITEM_HIGHLIGHT: "#690000",
    nadeItemHeadingBg: "rgba(28, 143, 192, 1)",
    footerBg: "#1c90c0",
    footerColor: "white",
    primaryBtnBg: "rgba(28, 143, 192, 0.85)",
    primaryBtnHover: "rgba(28, 143, 192, 1)",
    filterBg: "#e0e1e2",
    filterBgHover: "#c0c1c2",
    filterColor: "#262626",
    filterFavColor: "#ffbb00",
    filterResetBg: "#6e0000",
    filterResetDisabledBg: "#ccabab"
  }
};

export type ThemeKeys = keyof typeof themes;
