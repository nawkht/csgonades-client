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
  filterBorder: string;
  HIGHLIGHT_BG: string;
  boxBg: string;
  boxTitleBg: string;
  jumboGradientStart: string;
  jumboGradientEnd: string;
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
    PRIMARY: "#0d516e",
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
    primaryBtnBg: "#0d516e",
    primaryBtnHover: "rgba(28, 143, 192, 1)",
    filterBg: "#0d516e",
    filterBgHover: "#09384d",
    filterColor: "white",
    filterFavColor: "#ebda49",
    filterResetBg: "#6e0000",
    filterResetDisabledBg: "#544242",
    filterBorder: "#121212",
    FAV_YELLOW: "#bd9700",
    HIGHLIGHT_BG: "#3c4759",
    boxBg: "#1e1e1e",
    boxTitleBg: "#232323",
    jumboGradientStart: "#1e1e1e",
    jumboGradientEnd: "#232323",
  },
  light: {
    DP00: "#fff",
    DP01: "#fefefe",
    DP02: "#f9f9f9",
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
    TEXT: "#525252",
    NAV_HOVER: "#f7f7f7",
    NADE_ITEM_HIGHLIGHT: "#00c9ab",
    nadeItemHeadingBg: "#eee",
    footerBg: "#1c90c0",
    footerColor: "white",
    primaryBtnBg: "#f9f9f9",
    primaryBtnHover: "rgba(28, 143, 192, 1)",
    filterBg: "#f9f9f9",
    filterBgHover: "#ededed",
    filterColor: "#525252",
    filterFavColor: "#ffbb00",
    filterResetBg: "#6e0000",
    filterResetDisabledBg: "#ccabab",
    filterBorder: "#e9e9e9",
    FAV_YELLOW: "#fac800",
    HIGHLIGHT_BG: "#e8f1ff",
    boxBg: "#fff",
    boxTitleBg: "#f9f9f9",
    jumboGradientStart: "#f9f9f9",
    jumboGradientEnd: "#eeeeee",
  },
};

export type ThemeKeys = keyof typeof themes;
