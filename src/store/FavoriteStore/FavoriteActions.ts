import { Favorite } from "../../models/Favorite";

type AddAllFavoritesAction = {
  type: "@@favorites/ADD_ALL";
  favorites: Favorite[];
};

export type AddFavoriteAction = {
  type: "@@favorites/ADD";
  favorite: Favorite;
};

type RemoveFavoritesAction = {
  type: "@@favorites/REMOVE";
  favoriteId: string;
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
});

export const removeFavoriteAction = (
  favoriteId: string
): RemoveFavoritesAction => ({
  type: "@@favorites/REMOVE",
  favoriteId,
});
