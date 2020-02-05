import { Favorite } from "../../models/Favorite";
import { NadeLight } from "../../models/Nade/Nade";
import { Meta } from "../Analytics/AnalyticsMiddleware";

type AddAllFavoritesAction = {
  type: "@@favorites/add_all";
  favorites: Favorite[];
};

type AddFavoriteAction = {
  type: "@@favorites/add";
  favorite: Favorite;
  meta: Meta;
};

type RemoveFavoritesAction = {
  type: "@@favorites/remove";
  favoriteId: string;
  meta: Meta;
};

type AddFavoritedNades = {
  type: "@@favorites/ADD_FAVORITED_NADES";
  nades: NadeLight[];
};

type StartLoadingFavoritedNades = {
  type: "@@favorites/START_LOADING_FAVORITED_NADES";
};

type StopLoadingFavoritedNades = {
  type: "@@favorites/STOP_LOADING_FAVORITED_NADES";
};

export type FavoriteActions =
  | AddAllFavoritesAction
  | AddFavoriteAction
  | RemoveFavoritesAction
  | AddFavoritedNades
  | StartLoadingFavoritedNades
  | StopLoadingFavoritedNades;

export const addAllFavoritesAction = (
  favorites: Favorite[]
): AddAllFavoritesAction => ({
  type: "@@favorites/add_all",
  favorites,
});

export const addFavoriteAction = (favorite: Favorite): AddFavoriteAction => ({
  type: "@@favorites/add",
  favorite,
  meta: { gaEvent: {} },
});

export const removeFavoriteAction = (
  favoriteId: string
): RemoveFavoritesAction => ({
  type: "@@favorites/remove",
  favoriteId,
  meta: { gaEvent: {} },
});

export const addFavoritedNadesAction = (
  nades: NadeLight[]
): AddFavoritedNades => ({
  type: "@@favorites/ADD_FAVORITED_NADES",
  nades,
});

export const startLoadingFavoritedNadesAction = (): StartLoadingFavoritedNades => ({
  type: "@@favorites/START_LOADING_FAVORITED_NADES",
});

export const stopLoadingFavoritedNades = (): StopLoadingFavoritedNades => ({
  type: "@@favorites/STOP_LOADING_FAVORITED_NADES",
});
