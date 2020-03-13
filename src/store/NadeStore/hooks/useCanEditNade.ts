import { useMemo } from "react";
import { useSelector } from "react-redux";
import { Nade } from "../../../models/Nade/Nade";
import { userSelector } from "../../AuthStore/AuthSelectors";

export const useCanEditNade = (nade: Nade): boolean => {
  const user = useSelector(userSelector);

  const canEdit = useMemo(() => {
    if (!user) {
      return false;
    } else if (user.role === "administrator" || user.role === "moderator") {
      return true;
    } else if (user.steamId === nade.steamId) {
      return true;
    } else {
      return false;
    }
  }, [user, nade.steamId]);

  return canEdit;
};
