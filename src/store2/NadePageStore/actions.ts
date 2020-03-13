import { Nade } from "../../models/Nade/Nade";

export type OnFavoriteNadeAction = {
  type: "@@nades/ON_FAVORITE_NADE";
  nade: Nade;
};

export type OnUnFavoriteNadeAction = {
  type: "@@nades/ON_UNFAVORITE_NADE";
  nade: Nade;
};

export type ReplaceNade = {
  type: "@@nades/REPLACE_NADE";
  nade: Nade;
};

export type NadeActions =
  | OnFavoriteNadeAction
  | OnUnFavoriteNadeAction
  | ReplaceNade;
