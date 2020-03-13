import { useContext, useMemo } from "react";
import { useSelector } from "react-redux";
import { NadeLight } from "../../../models/Nade/Nade";
import { favoritedNadeIdsSelector } from "../../../store/FavoriteStore/FavoriteSelectors";
import { NadeFilterContext } from "../context";
import {
  addFavoriteToNades,
  filterByCoords,
  filterByFavorite,
  filterByTickrate,
  filterByType,
} from "./helpers";

export const useFilteredNades = () => {
  const { state } = useContext(NadeFilterContext);
  const favoritedNades = useSelector(favoritedNadeIdsSelector);
  const { byTickrate, nades, byType, byCoords, byFavorites } = state;

  const filteredNades = useMemo(() => {
    let thenades = nades.sort(sortByScore);

    thenades = addFavoriteToNades(thenades, favoritedNades);
    thenades = filterByCoords(thenades, byCoords);
    thenades = filterByType(thenades, byType);
    thenades = filterByTickrate(thenades, byTickrate);
    thenades = filterByFavorite(thenades, byFavorites);

    return thenades;
  }, [byTickrate, nades, byType, favoritedNades, byCoords, byFavorites]);

  return filteredNades;
};

function sortByScore(a: NadeLight, b: NadeLight) {
  return b.score - a.score;
}
