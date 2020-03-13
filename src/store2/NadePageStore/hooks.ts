import { useCallback, useContext } from "react";
import { NadeApi } from "../../api/NadeApi";
import { useIsAdmin } from "../../store/AuthStore/AuthHooks";
import { NadePageStoreContext } from "./context";

export const useNade = () => {
  const { state } = useContext(NadePageStoreContext);

  return state.nade;
};

export const useNadeRegisterView = () => {
  const isAdmin = useIsAdmin();

  const registerNadeView = useCallback(
    (nadeId: string) => {
      if (isAdmin) {
        return;
      }
      NadeApi.registerView(nadeId);
    },
    [isAdmin]
  );

  return registerNadeView;
};
