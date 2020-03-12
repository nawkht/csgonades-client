import "next";
import { AnyAction, Store } from "redux";
import { AppState } from "../store";
import { ReduxThunkAction } from "../store/StoreUtils/ThunkActionType";

declare module "next" {
  export interface NextPageContext {
    reduxStore: Store<AppState, AnyAction | ReduxThunkAction>;
  }
}
