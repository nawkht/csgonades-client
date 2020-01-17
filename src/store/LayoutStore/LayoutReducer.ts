import { Reducer } from "redux";
import { assertNever } from "../../utils/Common";
import { LayoutActions } from "./LayoutActions";

export type ThemeState = {
  isMobile: boolean;
  uiDimensions: {
    SIDEBAR_WIDTH: number;
    HEADER_HEIGHT: number;
    PADDING_SMALL: number;
    PADDING_MEDIUM: number;
    PADDING_LARGE: number;
    PADDING_HUGE: number;
    INNER_GUTTER_SIZE: number;
    OUTER_GUTTER_SIZE: number;
    MOBILE_THRESHHOLD: number;
    BORDER_RADIUS: string;
  };
  layers: {
    MODAL: number;
    UNDER_UI: number;
    TOP_UI: number;
  };
  colors: {
    PRIMARY: string;
    PRIMARY_10_PERCENT: string;
    PRIMARY_75_PERCENT: string;
    PRIMARY_90_PERCENT: string;
    PRIMARY_BLACK: string;
    PRIMARY_BORDER: string;
    SUCCESS: string;
    SUCCESS_90: string;
    ERROR: string;
    ERROR_90: string;
    WARNING: string;
    WARNING_90: string;
  };
  durations: {
    transition: number;
  };
};

const initialState: ThemeState = {
  isMobile: false,
  uiDimensions: {
    SIDEBAR_WIDTH: 180,
    HEADER_HEIGHT: 60,
    PADDING_SMALL: 6,
    PADDING_MEDIUM: 12,
    PADDING_LARGE: 18,
    PADDING_HUGE: 24,
    INNER_GUTTER_SIZE: 24,
    OUTER_GUTTER_SIZE: 24,
    MOBILE_THRESHHOLD: 850,
    BORDER_RADIUS: "0.25rem"
  },
  layers: {
    MODAL: 999,
    TOP_UI: 900,
    UNDER_UI: 890
  },
  colors: {
    PRIMARY: "#1c90c0",
    PRIMARY_10_PERCENT: "rgba(28, 143, 192, 0.1)",
    PRIMARY_75_PERCENT: "rgba(28, 143, 192, 0.75)",
    PRIMARY_90_PERCENT: "rgba(28, 143, 192, 0.9)",
    PRIMARY_BLACK: "#262626",
    PRIMARY_BORDER: "rgba(0, 0, 0, 0.1)",
    SUCCESS: "#8cc01c",
    SUCCESS_90: "rgba(140, 192, 28, 0.9)",
    ERROR: "#c01c1c",
    ERROR_90: "rgba(192, 28, 28, 0.9)",
    WARNING: "#c05b1c",
    WARNING_90: "rgba(192, 91, 28, 0.9)"
  },
  durations: {
    transition: 0.15
  }
};

export const LayoutReducer: Reducer<ThemeState, LayoutActions> = (
  state = initialState,
  action
): ThemeState => {
  switch (action.type) {
    case "@@layout/SET_BROWSER":
      return initialState;
    case "@@layout/SET_MOBILE":
      return {
        ...state,
        isMobile: true,
        uiDimensions: {
          SIDEBAR_WIDTH: 180,
          HEADER_HEIGHT: 60,
          PADDING_SMALL: 6,
          PADDING_MEDIUM: 12,
          PADDING_LARGE: 18,
          PADDING_HUGE: 24,
          INNER_GUTTER_SIZE: 18,
          OUTER_GUTTER_SIZE: 0,
          MOBILE_THRESHHOLD: 850,
          BORDER_RADIUS: "0.25rem"
        }
      };
    default:
      assertNever(action);
      return state;
  }
};
