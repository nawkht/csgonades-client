import { useDispatch, useSelector } from "react-redux";
import { AppState } from "..";
import { GoogleAnalytics } from "../../utils/GoogleAnalytics";
import { useIsAdmin } from "../AuthStore/AuthHooks";
import { setThemeAction } from "./SettingsActions";
import { themes } from "./Themes";

const themeSelector = (state: AppState) => state.settingsStore.theme;

export const useTheme = () => {
  const isAdmin = useIsAdmin();

  const dispatch = useDispatch();
  const theme = useSelector(themeSelector);
  const colors = themes[theme];

  const toggleTheme = () => {
    if (theme === "light") {
      GoogleAnalytics.event({
        category: "Theme",
        action: "Set Darkmode",
        ignore: isAdmin
      });
      dispatch(setThemeAction("dark"));
    } else {
      GoogleAnalytics.event({
        category: "Theme",
        action: "Set Lightmode",
        ignore: isAdmin
      });
      dispatch(setThemeAction("light"));
    }
  };

  return {
    theme,
    colors,
    toggleTheme
  };
};
