import { Favorite } from "../../models/Favorite";

type AddAllFavoritesAction = {
  type: "@@favorites/add_all";
  favorites: Favorite[];
};

type AddFavoriteAction = {
  type: "@@favorites/add";
  favorite: Favorite;
};

type RemoveFavoritesAction = {
  type: "@@favorites/remove";
  favoriteId: string;
};

export type FavoriteActions =
  | AddAllFavoritesAction
  | AddFavoriteAction
  | RemoveFavoritesAction;

export const addAllFavoritesAction = (
  favorites: Favorite[]
): AddAllFavoritesAction => ({
  type: "@@favorites/add_all",
  favorites
});

export const addFavoriteAction = (favorite: Favorite): AddFavoriteAction => ({
  type: "@@favorites/add",
  favorite
});

export const removeFavoriteAction = (
  favoriteId: string
): RemoveFavoritesAction => ({
  type: "@@favorites/remove",
  favoriteId
});
