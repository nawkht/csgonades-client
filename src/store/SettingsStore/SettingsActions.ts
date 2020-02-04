import { Meta } from "../Analytics/AnalyticsMiddleware";
import { ThemeKeys } from "./Themes";

type SetTheme = {
  type: "@@settings/SET_THEME";
  theme: ThemeKeys;
  meta: Meta;
};

export const setThemeAction = (theme: ThemeKeys): SetTheme => ({
  type: "@@settings/SET_THEME",
  theme,
  meta: {
    gaEvent: {
      label: theme
    }
  }
});

export type SettingsActions = SetTheme;
