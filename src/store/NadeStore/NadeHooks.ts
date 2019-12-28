import { Nade, NadeBody } from "../../models/Nade";
import { useSelector } from "react-redux";
import { userSelector } from "../AuthStore/AuthSelectors";
import {
  useReduxDispatch,
  ReduxThunkAction
} from "../StoreUtils/ThunkActionType";
import { NadeApi } from "../../api/NadeApi";
import Router from "next/router";
import { startLoadingNadeAction, stopLoadingNadeAction } from "./NadeActions";

export const useCanEditNade = (nade: Nade): boolean => {
  const user = useSelector(userSelector);
  if (!user) {
    return false;
  }

  if (user.role === "administrator" || user.role === "moderator") {
    return true;
  }

  if (user.steamID === nade.steamId) {
    return true;
  }

  return false;
};

export const useCreateNade = () => {
  const reduxDispatch = useReduxDispatch();
  return (nadeBody: NadeBody) => {
    const thunk: ReduxThunkAction = async (dispatch, getState) => {
      const { token } = getState().auth;
      if (!token) {
        console.log("useCreateNade no token");
        return;
      }

      dispatch(startLoadingNadeAction());
      const result = await NadeApi.save(nadeBody, token);
      dispatch(stopLoadingNadeAction());

      if (result.isErr()) {
        console.error(result.error);
        return;
      }

      Router.push(`/nades/${result.value.id}`);
    };
    reduxDispatch(thunk);
  };
};
