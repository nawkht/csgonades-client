import { Icon, Popup } from "semantic-ui-react";
import {
  useAddFavorite,
  useUnfavorite,
  useIsFavorited
} from "../../store/FavoriteStore/FavoriteHooks";
import { FC, useState, useEffect } from "react";
import { useIsSignedIn } from "../../store/AuthStore/AuthHooks";

type Props = {
  nadeId: string;
};

export const FavoriteButton: FC<Props> = ({ nadeId }) => {
  const isSignedIn = useIsSignedIn();
  const favorite = useIsFavorited(nadeId);
  const addFavorite = useAddFavorite();
  const unFavorite = useUnfavorite();
  const [starColor, setStarColor] = useState<any>(favorite ? "yellow" : "grey");
  const [didClickFavorite, setDidClickFavorite] = useState(false);

  useEffect(() => {
    if (favorite) {
      setStarColor("yellow");
    } else {
      setStarColor("grey");
    }
  }, [favorite]);

  function onFavoriteClick() {
    setDidClickFavorite(true);

    if (favorite) {
      unFavorite(favorite.id);
    } else {
      addFavorite(nadeId);
      setStarColor("yellow");
    }
  }

  function onMouseEnter() {
    if (favorite) {
      setStarColor("grey");
    } else {
      setStarColor("yellow");
    }
  }

  function onMouseLeave() {
    if (didClickFavorite) {
      setDidClickFavorite(false);
      return;
    }
    if (favorite) {
      setStarColor("yellow");
    } else {
      setStarColor("grey");
    }
  }

  if (!isSignedIn) {
    return (
      <Popup
        size="mini"
        inverted
        content={"You need to be signed in to favorite."}
        style={{ padding: 6 }}
        offset="0, 6px"
        position="left center"
        trigger={
          <Icon
            color="grey"
            className="favorite-icon"
            name="star"
            size="large"
          />
        }
      />
    );
  }

  return (
    <div
      onClick={onFavoriteClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Popup
        size="mini"
        inverted
        content={favorite ? "Unfavorite" : "Favorite"}
        style={{ padding: 6 }}
        offset="0, 6px"
        position="left center"
        trigger={
          <Icon
            link
            color={starColor}
            className="favorite-icon"
            name="star"
            size="large"
          />
        }
      />
    </div>
  );
};
