import { Reducer } from "redux";
import { GfycatData } from "../../models/Nade/GfycatData";
import { assertNever } from "../../utils/Common";
import { NewNadeActions } from "./NewNadeActions";

export type NewNadeState = {
  gfyData?: GfycatData;
  imageData?: string;
  gfyError?: string;
  imgError?: string;
  loadingGfy: boolean;
  loadingSubmit: boolean;
};

const initialState: NewNadeState = {
  loadingGfy: false,
  loadingSubmit: false
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
        gfyError: undefined,
        loadingGfy: false
      };
    case "@@newnade/ADD_IMG":
      return {
        ...state,
        imgError: undefined,
        imageData: action.imgData
      };
    case "@@newnade/GFY_ERROR":
      return {
        ...state,
        gfyError: action.error,
        loadingGfy: false,
        gfyData: undefined
      };
    case "@@newnade/START_LOADING_GFY":
      return {
        ...state,
        loadingGfy: true,
        gfyError: undefined
      };
    case "@@newnade/IMG_ERROR":
      return {
        ...state,
        imgError: action.error,
        imageData: undefined
      };
    case "@@newnade/SUBMIT_ERROR":
      return {
        ...state,
        loadingSubmit: false
      };
    case "@@newnade/SUBMIT_START_LOAD":
      return {
        ...state,
        loadingSubmit: true,
        gfyError: undefined,
        imgError: undefined
      };
    default:
      assertNever(action);
      return state;
  }
};
