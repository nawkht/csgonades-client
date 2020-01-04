import { useSelector } from "react-redux";
import { themeSelector } from "./LayoutSelectors";

export const useTheme = () => {
  const dimensions = useSelector(themeSelector);
  return dimensions;
};
