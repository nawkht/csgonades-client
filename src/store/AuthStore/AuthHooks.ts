import { useSelector } from "react-redux";
import { Nade } from "../../models/Nade";
import { userSelector } from "./AuthSelectors";

export const useIsAllowedNadeEdit = (nade: Nade) => {
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
