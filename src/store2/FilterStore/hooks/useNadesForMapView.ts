import { useMemo } from "react";
import { useSelector } from "react-redux";
import { NadeLight } from "../../../models/Nade/Nade";
import { favoritedNadeIdsSelector } from "../../../store/FavoriteStore/FavoriteSelectors";
import { useNadeFilterState } from "../context";
import {
  addFavoriteToNades,
  containsSimilarNade,
  filterByFavorite,
  filterByTickrate,
  filterByType,
} from "./helpers";

export const useNadesForMapView = (): NadeLight[] => {
  const favoritedNades = useSelector(favoritedNadeIdsSelector);
  const { state } = useNadeFilterState();
  const { nades, byType, byTickrate, byFavorites } = state;

  const unqiueNadesForPosition = useMemo(() => {
    const unqiueNades: NadeLight[] = [];

    if (!nades) {
      return unqiueNades;
    }

    let filteredNades = [...nades];

    filteredNades = addFavoriteToNades(filteredNades, favoritedNades);
    filteredNades = filterByType(filteredNades, byType);
    filteredNades = filterByTickrate(filteredNades, byTickrate);
    filteredNades = filterByFavorite(filteredNades, byFavorites);

    for (const nade of filteredNades) {
      if (nade.mapEndCoord && nade.type) {
        if (!containsSimilarNade(nade, unqiueNades)) {
          unqiueNades.push(nade);
        }
      }
    }
    return unqiueNades;
  }, [nades, byType, byTickrate, byFavorites, favoritedNades]);

  return unqiueNadesForPosition;
};
