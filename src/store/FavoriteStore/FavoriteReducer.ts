import { Reducer } from "redux";
import { Favorite } from "../../models/Favorite";
import { FavoriteActions } from "./FavoriteActions";
import { NadeLight } from "../../models/Nade/Nade";

export type FavoritesState = {
  favorites: Favorite[];
  loadingFavoritedNade: boolean;
  favoritedNades: NadeLight[];
};

const initialState: FavoritesState = {
  favorites: [],
  loadingFavoritedNade: false,
  favoritedNades: []
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
    case "@@favorites/START_LOADING_FAVORITED_NADES":
      return {
        ...state,
        loadingFavoritedNade: true
      };
    case "@@favorites/STOP_LOADING_FAVORITED_NADES":
      return {
        ...state,
        loadingFavoritedNade: false
      };
    case "@@favorites/ADD_FAVORITED_NADES":
      return {
        ...state,
        favoritedNades: action.nades
      };
    default:
      return state;
  }
};
