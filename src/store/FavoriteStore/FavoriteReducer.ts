import { Reducer } from "redux";
import { Favorite } from "../../models/Favorite";
import { NadeLight } from "../../models/Nade/Nade";
import { assertNever } from "../../utils/Common";
import { FavoriteActions } from "./FavoriteActions";

export type FavoritesState = {
  favorites: Favorite[];
  loadingFavoritedNade: boolean;
  favoritedNades: NadeLight[];
  favoriteInProgress: boolean;
};

const initialState: FavoritesState = {
  favorites: [],
  loadingFavoritedNade: false,
  favoritedNades: [],
  favoriteInProgress: false,
};

export const FavoriteReducer: Reducer<FavoritesState, FavoriteActions> = (
  state = initialState,
  action
): FavoritesState => {
  switch (action.type) {
    case "@@favorites/add":
      return {
        ...state,
        favorites: [...state.favorites, action.favorite],
      };
    case "@@favorites/add_all":
      return {
        ...state,
        favorites: action.favorites,
      };
    case "@@favorites/remove":
      return {
        ...state,
        favorites: state.favorites.filter(
          favorite => favorite.id !== action.favoriteId
        ),
        favoritedNades: state.favoritedNades.filter(
          fav => fav.id !== action.favoriteId
        ),
      };
    case "@@favorites/START_LOADING_FAVORITED_NADES":
      return {
        ...state,
        loadingFavoritedNade: true,
      };
    case "@@favorites/STOP_LOADING_FAVORITED_NADES":
      return {
        ...state,
        loadingFavoritedNade: false,
      };
    case "@@favorites/ADD_FAVORITED_NADES":
      return {
        ...state,
        favoritedNades: action.nades,
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
