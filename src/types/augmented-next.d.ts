import "next";
import { Store } from "redux";
import { AppState } from "../store";

declare module "next" {
  export interface NextPageContext {
    store: Store<AppState>;
  }
}
