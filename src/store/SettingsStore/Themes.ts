export type ThemeColors = {
  DP00: string;
  DP01: string;
  DP02: string;
  FAV_YELLOW: string;
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
  HIGHLIGHT_BG: string;
};

type Themes = {
  dark: ThemeColors;
  light: ThemeColors;
};

export const themes: Themes = {
  dark: {
    DP00: "#121212",
    DP01: "#1e1e1e",
    DP02: "#232323",
    SITE_BG: "#121212",
    UI_BG: "#212121",
    PRIMARY: "rgba(28, 143, 192, 1)",
    PRIMARY_10: "rgba(28, 143, 192, 0.1)",
    PRIMARY_BLACK: "#262626",
    BORDER: "rgba(0, 0, 0, 1)",
    SUCCESS: "#8cc01c",
    ERROR: "#c01c1c",
    WARNING: "#c05b1c",
    GREY: "#e3e3e3",
    TEXT: "white",
    NAV_HOVER: "rgba(28, 143, 192, 0.1)",
    NADE_ITEM_HIGHLIGHT: "#009982",
    nadeItemHeadingBg: "#232323",
    footerBg: "#212121",
    footerColor: "white",
    primaryBtnBg: "rgba(28, 143, 192, 0.85)",
    primaryBtnHover: "rgba(28, 143, 192, 1)",
    filterBg: "#292929",
    filterBgHover: "#151515",
    filterColor: "white",
    filterFavColor: "#ebda49",
    filterResetBg: "#6e0000",
    filterResetDisabledBg: "#544242",
    FAV_YELLOW: "#bd9700",
    HIGHLIGHT_BG: "#3c4759",
  },
  light: {
    DP00: "#f3f3f3",
    DP01: "#fff",
    DP02: "#fff",
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
    NADE_ITEM_HIGHLIGHT: "#00c9ab",
    nadeItemHeadingBg: "rgba(28, 143, 192, 1)",
    footerBg: "#1c90c0",
    footerColor: "white",
    primaryBtnBg: "rgba(28, 143, 192, 0.85)",
    primaryBtnHover: "rgba(28, 143, 192, 1)",
    filterBg: "rgba(28, 144, 192, 1)",
    filterBgHover: "#197da6",
    filterColor: "#262626",
    filterFavColor: "#ffbb00",
    filterResetBg: "#6e0000",
    filterResetDisabledBg: "#ccabab",
    FAV_YELLOW: "#fac800",
    HIGHLIGHT_BG: "#e8f1ff",
  },
};

export type ThemeKeys = keyof typeof themes;
