import { Favorite } from "../../models/Favorite";
import { Meta } from "../Analytics/AnalyticsMiddleware";

type AddAllFavoritesAction = {
  type: "@@favorites/ADD_ALL";
  favorites: Favorite[];
};

export type AddFavoriteAction = {
  type: "@@favorites/ADD";
  favorite: Favorite;
  meta: Meta;
};

type RemoveFavoritesAction = {
  type: "@@favorites/REMOVE";
  favoriteId: string;
  meta: Meta;
};

type FavoriteInProgressBegin = {
  type: "@@favorites/FAVORITE_IN_PROGRESS_BEGIN";
};

type FavoriteInProgressEnd = {
  type: "@@favorites/FAVORITE_IN_PROGRESS_END";
};

export type FavoriteActions =
  | AddAllFavoritesAction
  | AddFavoriteAction
  | RemoveFavoritesAction
  | FavoriteInProgressBegin
  | FavoriteInProgressEnd;

export const favoriteInProgressBeginAction = (): FavoriteInProgressBegin => ({
  type: "@@favorites/FAVORITE_IN_PROGRESS_BEGIN",
});

export const favoriteInProgressEndAction = (): FavoriteInProgressEnd => ({
  type: "@@favorites/FAVORITE_IN_PROGRESS_END",
});

export const addAllFavoritesAction = (
  favorites: Favorite[]
): AddAllFavoritesAction => ({
  type: "@@favorites/ADD_ALL",
  favorites,
});

export const addFavoriteAction = (favorite: Favorite): AddFavoriteAction => ({
  type: "@@favorites/ADD",
  favorite,
  meta: { gaEvent: {} },
});

export const removeFavoriteAction = (
  favoriteId: string
): RemoveFavoritesAction => ({
  type: "@@favorites/REMOVE",
  favoriteId,
  meta: { gaEvent: {} },
});
