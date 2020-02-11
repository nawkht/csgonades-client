import { Reducer } from "redux";
import { Favorite } from "../../models/Favorite";
import { assertNever } from "../../utils/Common";
import { FavoriteActions } from "./FavoriteActions";

export interface FavoritesState {
  favorites: Favorite[];
  favoriteInProgress: boolean;
}

const initialState: FavoritesState = {
  favorites: [],
  favoriteInProgress: false,
};

export const FavoriteReducer: Reducer<FavoritesState, FavoriteActions> = (
  state = initialState,
  action
): FavoritesState => {
  switch (action.type) {
    case "@@favorites/ADD":
      return {
        ...state,
        favorites: [...state.favorites, action.favorite],
      };
    case "@@favorites/ADD_ALL":
      return {
        ...state,
        favorites: action.favorites,
      };
    case "@@favorites/REMOVE":
      return {
        ...state,
        favorites: state.favorites.filter(
          favorite => favorite.id !== action.favoriteId
        ),
      };
    case "@@favorites/FAVORITE_IN_PROGRESS_BEGIN":
      return {
        ...state,
        favoriteInProgress: true,
      };
    case "@@favorites/FAVORITE_IN_PROGRESS_END":
      return {
        ...state,
        favoriteInProgress: false,
      };
    default:
      assertNever(action);
      return state;
  }
};
