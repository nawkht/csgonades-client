import { useDispatch } from "react-redux";
import { Action } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { AppState } from "..";

export type ReduxDispatch<A> = ThunkDispatch<AppState, any, Action<A>>;

export type ReduxThunkAction = ThunkAction<void, AppState, null, Action>;

export function useReduxDispatch<A extends Action>(): ReduxDispatch<A> {
  return useDispatch<ReduxDispatch<A>>();
}
