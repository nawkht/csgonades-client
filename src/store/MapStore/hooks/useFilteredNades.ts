import { useMemo } from "react";
import { useSelector } from "react-redux";
import { MapCoordinates, NadeLight } from "../../../models/Nade/Nade";
import { Tickrate } from "../../../models/Nade/NadeTickrate";
import { NadeType } from "../../../models/Nade/NadeType";
import { favoritedNadeIdsSelector } from "../../../store/FavoriteStore/FavoriteSelectors";
import {
  addFavoriteToNades,
  filterByCoords,
  filterByFavorite,
  filterByTickrate,
  filterByType,
  filterBySortMethod,
} from "./helpers";
import {
  filterByCoordsSelector,
  filterByTickrateSelector,
  filterByFavoritesSelector,
  filterByTypeSelector,
  filterByMethodSelector,
} from "../selectors";
import { NadeSortingMethod } from "../reducer";

export const useFilterServerSideNades = (ssrNades: NadeLight[]) => {
  const byCoords = useSelector(filterByCoordsSelector);
  const byTickrate = useSelector(filterByTickrateSelector);
  const byFavorites = useSelector(filterByFavoritesSelector);
  const byType = useSelector(filterByTypeSelector);
  const favoritedNades = useSelector(favoritedNadeIdsSelector);
  const bySortingMethod = useSelector(filterByMethodSelector);

  return useMemo(() => {
    return filterNades(
      ssrNades,
      favoritedNades,
      byFavorites,
      bySortingMethod,
      byCoords,
      byType,
      byTickrate
    );
  }, [
    byCoords,
    byTickrate,
    byFavorites,
    byType,
    favoritedNades,
    ssrNades,
    bySortingMethod,
  ]);
};

export function filterNades(
  nades: NadeLight[],
  favoritedNades: string[],
  byFavorites: boolean,
  byMethod: NadeSortingMethod,
  byCoords?: MapCoordinates,
  byType?: NadeType,
  byTickrate?: Tickrate
) {
  let thenades = [...nades];
  thenades.sort(sortByScore);

  thenades = addFavoriteToNades(thenades, favoritedNades);
  thenades = filterByCoords(thenades, byCoords);
  thenades = filterByType(thenades, byType);
  thenades = filterByTickrate(thenades, byTickrate);
  thenades = filterByFavorite(thenades, byFavorites);
  thenades = filterBySortMethod(thenades, byMethod);
  return thenades;
}

function sortByScore(a: NadeLight, b: NadeLight) {
  return b.score - a.score;
}
