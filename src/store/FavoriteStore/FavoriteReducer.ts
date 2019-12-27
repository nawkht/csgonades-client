import { Reducer } from "redux";
import { Favorite } from "../../models/Favorite";
import { FavoriteActions } from "./FavoriteActions";

export type FavoritesState = {
  favorites: Favorite[];
};

const initialState: FavoritesState = {
  favorites: []
};

export const FavoriteReducer: Reducer<FavoritesState, FavoriteActions> = (
  state = initialState,
  action
): FavoritesState => {
  switch (action.type) {
    case "@@favorites/add":
      return {
        ...state,
        favorites: [...state.favorites, action.favorite]
      };
    case "@@favorites/add_all":
      return {
        ...state,
        favorites: action.favorites
      };
    case "@@favorites/remove":
      return {
        ...state,
        favorites: state.favorites.filter(
          favorite => favorite.id !== action.favoriteId
        )
      };
    default:
      return state;
  }
};
