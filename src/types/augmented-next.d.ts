import "next";
import { Store, AnyAction } from "redux";
import { AppState } from "../store";
import { ThunkAction } from "redux-thunk";

declare module "next" {
  export interface NextPageContext {
    store: Store<AppState, AnyAction | ThunkAction>;
  }
}
