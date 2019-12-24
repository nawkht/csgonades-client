import { Nade } from "../../models/Nade";
import { useSelector } from "react-redux";
import { userSelector } from "../AuthStore/AuthSelectors";

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
