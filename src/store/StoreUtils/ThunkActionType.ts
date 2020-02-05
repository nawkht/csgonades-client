import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { AppState } from "..";

export type ReduxThunkAction = ThunkAction<void, AppState, null, Action>;
