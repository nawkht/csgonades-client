import "next";
import { AnyAction, Store } from "redux";
import { AppState } from "../store";

declare module "next" {
  export interface NextPageContext {
    reduxStore: Store<AppState, AnyAction>;
  }
}
