import { Reducer } from "redux";
import { GfycatData } from "../../models/Nade/GfycatData";
import { assertNever } from "../../utils/Common";
import { NewNadeActions } from "./NewNadeActions";

export type NewNadeStep = "gfycat" | "result-img";

export type NewNadeState = {
  step: NewNadeStep;
  gfyData?: GfycatData;
  loading: boolean;
  error?: string;
};

const initialState: NewNadeState = {
  step: "gfycat",
  loading: false
};

export const NewNadeReducer: Reducer<NewNadeState, NewNadeActions> = (
  state = initialState,
  action
): NewNadeState => {
  switch (action.type) {
    case "@@newnade/CLEAR_ALL":
      return initialState;
    case "@@newnade/ADD_GFYCAT":
      return {
        ...state,
        gfyData: action.gfyData,
        loading: false,
        error: undefined
      };
    case "@@nednade/SET_STEP":
      return {
        ...state,
        step: action.step
      };
    case "@@newnade/ERROR":
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case "@@newnade/START_LOADING":
      return {
        ...state,
        loading: true,
        error: undefined
      };
    default:
      assertNever(action);
      return state;
  }
};
