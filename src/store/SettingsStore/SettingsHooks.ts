import { useDispatch, useSelector } from "react-redux";
import { AppState } from "..";
import { GoogleAnalytics } from "../../utils/GoogleAnalytics";
import { setThemeAction } from "./SettingsActions";
import { themes } from "./Themes";

const themeSelector = (state: AppState) => state.settingsStore.theme;

export const useTheme = () => {
  const dispatch = useDispatch();
  const theme = useSelector(themeSelector);
  const colors = themes[theme];

  const toggleTheme = () => {
    if (theme === "light") {
      GoogleAnalytics.event("Theme", "Set Darkmode");
      dispatch(setThemeAction("dark"));
    } else {
      GoogleAnalytics.event("Theme", "Set Lightmode");
      dispatch(setThemeAction("light"));
    }
  };

  return {
    theme,
    colors,
    toggleTheme
  };
};
