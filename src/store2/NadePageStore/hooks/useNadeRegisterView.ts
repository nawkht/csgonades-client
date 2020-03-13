import { useCallback } from "react";
import { NadeApi } from "../../../api/NadeApi";
import { useIsAdmin } from "../../../store/AuthStore/AuthHooks";
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
