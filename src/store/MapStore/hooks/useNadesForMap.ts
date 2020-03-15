import { useSelector } from "react-redux";
import { allNadesSelector, currentMapSelector } from "../selectors";

export const useNadesForMap = () => {
  const currentMap = useSelector(currentMapSelector);
  const allNades = useSelector(allNadesSelector);

  return currentMap ? allNades[currentMap] : undefined;
};
