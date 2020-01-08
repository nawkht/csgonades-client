import { useSelector, useDispatch } from "react-redux";
import { themeSelector } from "./LayoutSelectors";
import { useEffect } from "react";
import { setMobileAction, setBrowseraction } from "./LayoutActions";
import { isMobile } from "react-device-detect";
import { useWindowSize } from "../../utils/CommonHooks";

export const useTheme = () => {
  const dimensions = useSelector(themeSelector);
  return dimensions;
};

export const useThemeSync = () => {
  const dispatch = useDispatch();
  const window = useWindowSize();

  useEffect(() => {
    if (isMobile) {
      dispatch(setMobileAction());
    } else {
      dispatch(setBrowseraction());
    }
  }, [window]);
};
