import { ThemeKeys } from "./Themes";
import { ClientConfig } from "../../api/ClientConfigApi";

type SetTheme = {
  type: "@@settings/SET_THEME";
  theme: ThemeKeys;
};

export const setThemeAction = (theme: ThemeKeys): SetTheme => ({
  type: "@@settings/SET_THEME",
  theme,
});

type ReplaceClientConfig = {
  type: "Settings/ReplaceClientConfig";
  config: ClientConfig;
};

export const replaceClientConfigAction = (
  config: ClientConfig
): ReplaceClientConfig => ({
  type: "Settings/ReplaceClientConfig",
  config,
});

export type SettingsActions = SetTheme | ReplaceClientConfig;
