import { useSelector } from "react-redux";
import { favoriteInProgress } from "../FavoriteSelectors";

export const useIsFavoriteInProgress = () => {
  const isInProgress = useSelector(favoriteInProgress);
  return isInProgress;
};
