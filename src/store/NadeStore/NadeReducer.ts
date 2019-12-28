import { Reducer } from "redux";
import { NadeLight, Nade } from "../../models/Nade";
import { NadeActions } from "./NadeActions";

export type NadeState = {
  nades: NadeLight[];
  selectedNade?: Nade;
  loading: boolean;
};

const initialState: NadeState = {
  nades: [],
  loading: false
};

export const NadeReducer: Reducer<NadeState, NadeActions> = (
  state = initialState,
  action
): NadeState => {
  switch (action.type) {
    case "@@nades/add":
      return {
        ...state,
        nades: action.nades
      };
    case "@@nades/add_selected":
      return {
        ...state,
        selectedNade: action.nade
      };
    default:
      return state;
  }
};
