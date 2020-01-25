import { ThemeKeys } from "./Themes";

type SetTheme = {
  type: "@@settings/SET_THEME";
  theme: ThemeKeys;
};

export const setThemeAction = (theme: ThemeKeys): SetTheme => ({
  type: "@@settings/SET_THEME",
  theme
});

export type SettingsActions = SetTheme;
