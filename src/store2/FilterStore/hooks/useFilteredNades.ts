import { useMemo } from "react";
import { useSelector } from "react-redux";
import { MapCoordinates, NadeLight } from "../../../models/Nade/Nade";
import { Tickrate } from "../../../models/Nade/NadeTickrate";
import { NadeType } from "../../../models/Nade/NadeType";
import { favoritedNadeIdsSelector } from "../../../store/FavoriteStore/FavoriteSelectors";
import { useNadeFilterState } from "../context";
import {
  addFavoriteToNades,
  filterByCoords,
  filterByFavorite,
  filterByTickrate,
  filterByType,
} from "./helpers";

export const useFilteredNades = () => {
  const { state } = useNadeFilterState();
  const favoritedNades = useSelector(favoritedNadeIdsSelector);
  const { byFavorites, byTickrate, nades, byCoords, byType } = state;

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
