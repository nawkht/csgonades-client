import { ThunkDispatch, ThunkAction } from "redux-thunk";
import { AppState } from "..";
import { useDispatch } from "react-redux";
import { Action, AnyAction } from "redux";

export type ReduxDispatch<A> = ThunkDispatch<AppState, any, Action<A>>;

export type ReduxThunkAction<A extends AnyAction = any> = ThunkAction<
  any,
  AppState,
  any,
  A
>;

export function useReduxDispatch<A extends Action>(): ReduxDispatch<A> {
  return useDispatch<ReduxDispatch<A>>();
}
