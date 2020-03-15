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
} from "./helpers";
import {
  currentMapSelector,
  allNadesSelector,
  filterByCoordsSelector,
  filterByTickrateSelector,
  filterByFavoritesSelector,
  filterByTypeSelector,
} from "../selectors";

export const useFilteredNades = () => {
  const currentMap = useSelector(currentMapSelector);
  const allNades = useSelector(allNadesSelector);
  const favoritedNades = useSelector(favoritedNadeIdsSelector);
  const byCoords = useSelector(filterByCoordsSelector);
  const byTickrate = useSelector(filterByTickrateSelector);
  const byFavorites = useSelector(filterByFavoritesSelector);
  const byType = useSelector(filterByTypeSelector);

  const nades = currentMap ? allNades[currentMap] || [] : [];

  const filteredNades = useMemo(() => {
    return filterNades(
      nades,
      favoritedNades,
      byFavorites,
      byCoords,
      byType,
      byTickrate
    );
  }, [byFavorites, byTickrate, nades, byCoords, byType, favoritedNades]);

  return filteredNades;
};

function filterNades(
  nades: NadeLight[],
  favoritedNades: string[],
  byFavorites: boolean,
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
  return thenades;
}

function sortByScore(a: NadeLight, b: NadeLight) {
  return b.score - a.score;
}
