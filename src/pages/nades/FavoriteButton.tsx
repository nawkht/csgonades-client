import { Icon } from "semantic-ui-react";
import {
  useAddFavorite,
  useUnfavorite,
  useIsFavorited
} from "../../store/FavoriteStore/FavoriteHooks";
import { FC } from "react";

type Props = {
  nadeId: string;
};

export const FavoriteButton: FC<Props> = ({ nadeId }) => {
  const favorite = useIsFavorited(nadeId);
  const addFavorite = useAddFavorite();
  const unFavorite = useUnfavorite();

  const color = favorite ? "yellow" : "grey";

  function onFavoriteClick() {
    if (favorite) {
      unFavorite(favorite.id);
    } else {
      addFavorite(nadeId);
    }
  }

  return (
    <div onClick={onFavoriteClick}>
      <Icon
        circular
        link
        color={color}
        className="favorite-icon"
        name="star"
        size="large"
      />
    </div>
  );
};
